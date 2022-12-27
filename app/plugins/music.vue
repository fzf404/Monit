<!--
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2022-12-27 15:42:37
 * @Description: music 网易云音乐播放
-->
<template>
  <!-- 设置 -->
  <Setting :store="store" :setting="setting" @save="getPlayList" />
  <!-- 图像展示 -->
  <Image :show="state.login.show" remark="请使用网易云音乐扫码登陆" :image="state.login.qrcode" />
  <!-- 加载中 -->
  <Loading :show="state.loading" :remark="['音乐加载中...']" />
  <!-- 页面内容 -->
  <article class="grid grid-cols-5 grid-rows-5 gap-x-3 gap-y-1 p-3">
    <!-- 封面图 -->
    <section class="flex-col-center col-span-1 row-span-3 mt-4">
      <img
        :src="store.music[store.current].image"
        class="h-14 w-14 rounded-full ring-4 ring-white"
        :class="{ 'animate-[rotating_2s_linear_infinite]': state.play }"
      />
    </section>
    <!-- 音乐信息  -->
    <section class="flex-col-center-left col-span-2 row-span-3 mt-4">
      <!-- TODO 歌名自动滚动 -->
      <h1 class="text-light text-md h-7 w-full overflow-x-auto whitespace-nowrap">
        {{ store.music[store.current].title }}
      </h1>
      <p class="text-intro max-h-9 w-full overflow-y-auto text-xs">{{ store.music[store.current].author }}</p>
    </section>
    <!-- 播放列表 -->
    <section class="flex-scroll col-span-2 row-span-5 mt-3 space-y-2">
      <p
        v-for="(item, index) in store.music"
        class="flex-row-center clickable space-x-1"
        @click="store.current = index"
      >
        <MusicSVG class="btn-svg text-theme h-4" />
        <span class="text-gray whitespace-nowrap text-xs">
          {{ item.title }}
        </span>
      </p>
    </section>
    <!-- 音乐控制 -->
    <section class="flex-row-center relative col-span-3 row-span-2 pt-4">
      <!-- 已播放时间 -->
      <span class="text-intro absolute -top-2 left-0 text-xs">{{ state.control.current }}</span>
      <!-- 未播放时间 -->
      <span class="text-intro absolute -top-2 right-0 text-xs">{{ state.control.duration }}</span>
      <!-- 进度条 -->
      <p
        class="bg-theme clickable absolute top-3 left-0 h-1 rounded-full"
        :style="{ width: state.control.process + '%' }"
      ></p>
      <!-- 底部进度条 -->
      <p class="bg-theme clickable absolute top-3 h-1 w-full rounded-full opacity-40"></p>
      <!-- 播放进度调整 -->
      <p
        class="clickable absolute top-2 h-3 w-full rounded-full opacity-40"
        @click="
          (event) => {
            audio.currentTime = (event.offsetX / event.target.offsetWidth) * audio.duration
          }
        "
      ></p>
      <!-- 循环播放 -->
      <RepeatSVG class="text-gray btn-svg absolute left-0 w-5" v-if="store.mode === 0" @click="store.mode = 1" />
      <!-- 随机播放 -->
      <ShuffleSVG class="text-gray btn-svg absolute left-0 w-5" v-else-if="store.mode === 1" @click="store.mode = 2" />
      <!-- 单曲循环 -->
      <SingleSVG class="text-gray btn-svg absolute left-0 w-5" v-else @click="store.mode = 0" />
      <!-- 上一首 -->
      <PrevSVG class="text-light btn-svg w-10" @click="prevMusic" />
      <!-- 暂停 -->
      <PauseSVG class="text-light btn-svg w-10" v-if="state.play" @click="pauseMusic" />
      <!-- 播放 -->
      <PlaySVG class="text-light btn-svg w-10" v-else @click="playMusic" />
      <!-- 下一首 -->
      <NextSVG class="text-light btn-svg w-10" @click="nextMusic" />
      <!-- 下载音乐 -->
      <DownloadSVG class="text-gray btn-svg absolute right-0 w-5" @click="saveMusic" />
    </section>
  </article>
</template>

<script setup>
import { onMounted, reactive } from 'vue'

import { sendAlert } from '#/ipc'
import axios from '~/request'
import { storage } from '~/storage'

import { main } from '@/pinia'

import Image from '@/components/image.vue'
import Loading from '@/components/loading.vue'
import Setting from '@/components/setting.vue'

import DownloadSVG from '@/assets/music/download.svg'
import MusicSVG from '@/assets/music/music.svg'
import NextSVG from '@/assets/music/next.svg'
import PauseSVG from '@/assets/music/pause.svg'
import PlaySVG from '@/assets/music/play.svg'
import PrevSVG from '@/assets/music/prev.svg'
import RepeatSVG from '@/assets/music/repeat.svg'
import ShuffleSVG from '@/assets/music/shuffle.svg'
import SingleSVG from '@/assets/music/single.svg'

// 初始化 pinia
const pinia = main()

// 初始化 audio
const audio = new Audio()

// 设置音量
audio.volume = 0.4

// 状态信息
const state = reactive({
  // 播放状态
  play: false,
  // 加载状态
  loading: false,
  // 登陆状态
  login: {
    show: false,
    qrcode: null,
  },
  // 音乐控制器
  control: {
    current: null,
    duration: null,
    process: null,
  },
})

// 存储数据
const store = storage(
  {
    id: '7667645628', // 歌单 ID
    url: 'https://api-music.imsyy.top', // 接口地址
    mode: 0, // 播放模式 0 循环播放 1 随机播放 2 单曲循环
    cookie: null, // 登陆信息
    current: 0, // 音乐索引
    music: [
      {
        id: null,
        url: null,
        title: null,
        author: null,
        image: null,
      },
    ],
  },
  {
    // 接口地址修改
    url: () => {
      location.reload()
    },
    // 音乐索引修改
    current: async () => {
      // 加载音乐
      await loadMusic()
      // 播放音乐
      await playMusic()
    },
  }
)

// 初始化 axios
const request = axios(store.url)

// 登录
const login = async () => {
  // 获取登陆密钥
  const { unikey } = (await request.get(`/login/qr/key?timerstamp=${Date.now()}`)).data
  if (!unikey) {
    return sendAlert('登录密钥获取失败！')
  }

  // 获取登陆二维码
  const { qrimg } = (await request.get(`/login/qr/create?qrimg=true&timerstamp=${Date.now()}&key=${unikey}`)).data
  // 设置登陆二维码
  state.login.qrcode = qrimg
  // 展示登录二维码
  state.login.show = true
  // 关闭设置
  pinia.closeSetting()

  // 轮询登陆状态
  const callback = setInterval(async () => {
    // 获取登陆状态
    const data = await request.get(`/login/qr/check?timerstamp=${Date.now()}&key=${unikey}`)
    // 登陆成功
    if (data.code == 803) {
      clearInterval(callback) // 撤销轮询
      store.cookie = data.cookie // 设置 cookie
      state.login.show = false // 隐藏登录二维码
      await getUser() // 获取用户信息
      pinia.openSetting() // 展示设置
    }
  }, 1000)

  // 超时时间 60s
  setTimeout(() => {
    clearInterval(callback) // 撤销轮询
    state.login.show = false // 隐藏登陆二维码
    pinia.openSetting() // 展示设置
  }, 60000)
}

// 设置项
const setting = reactive([
  {
    id: 'url',
    label: '请求地址',
    type: 'text',
    help: 'https://monit.fzf404.art/#/zh/01-guide?id=🎵-music-音乐',
  },
  {
    label: '登陆账号',
    type: 'button',
    options: {
      text: '登 陆',
      click: login,
    },
  },
])

// 登陆状态验证
const getUser = async () => {
  // 加载中
  state.loading = true

  // 获取账号信息
  const { account } = await request.get(`/user/account?cookie=${store.cookie}`)
  // 验证登陆
  if (account === null) {
    return login()
  }
  // 验证状态
  if (account.status === 0) {
    // 获取歌单列表
    const { playlist } = await request.get(`/user/playlist?uid=${account.id}&cookie=${store.cookie}`)
    // 设置歌单信息
    setting.push({
      id: 'id',
      label: '歌单',
      type: 'select',
      options: playlist.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    })
  }
}

// 读取歌单信息
const getPlayList = async () => {
  // 暂停播放
  state.play = false
  // 加载中
  state.loading = true

  // 读取歌单音乐
  const { songs } = await request.get(`/playlist/track/all?cookie=${store.cookie}&id=${store.id}`).catch((err) => {
    return sendAlert('获取歌单失败：' + err.message)
  })
  // 音乐列表
  const music = songs.map((item) => {
    return {
      id: item.id,
      title: item.name,
      author: item.ar.map((item) => item.name).join('/'),
      image: item.al.picUrl + '?param=100y100',
    }
  })

  // 判断索引越界
  if (store.current > music.length - 1) {
    // 设置当前音乐索引
    store.current = 0
  }

  // 存储音乐
  store.music = music

  // 加载音乐
  loadMusic()
}

// 获取音乐时间信息
const getMusicTime = () => {
  // 当前时长
  let currentMinutes = Math.floor(audio.currentTime / 60)
  let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60)

  // 播放进度
  let progress = (audio.currentTime / audio.duration) * 100

  if (currentSeconds < 10) {
    currentSeconds = '0' + currentSeconds
  }

  state.control.current = currentMinutes + ':' + currentSeconds
  state.control.process = progress
}

// 获取音乐长度
const getMusicDuration = () => {
  // 总时长
  let durationMinutes = Math.floor(audio.duration / 60)
  let durationSeconds = Math.floor(audio.duration - durationMinutes * 60)
  if (durationSeconds < 10) {
    durationSeconds = '0' + durationSeconds
  }
  // 控制器时长
  state.control = {
    current: '0:00',
    duration: durationMinutes + ':' + durationSeconds,
    process: 0,
  }
}

// 获得音乐 URL
const loadMusic = async () => {
  // 加载中
  state.loading = true
  // 获取 URL
  const { url } = (
    await request.get(`/song/url/v1?cookie=${store.cookie}&id=${store.music[store.current].id}&level=standard`)
  ).data[0]
  // 判断 URL 存在
  if (url) {
    // 设置音乐 URL
    audio.src = url
  } else {
    // 播放下一首
    nextMusic()
  }
}

// 播放音乐
const playMusic = async () => {
  // 播放音乐
  audio.play().catch((err) => {
    sendAlert('音乐加载失败：' + err.message)
    state.play = false
    state.loading = false
  })
}

// 暂停音乐
const pauseMusic = () => {
  audio.pause()
}

// 上一首音乐
const prevMusic = () => {
  switch (store.mode) {
    case 0: // 循环播放
      return (store.current = store.current === 0 ? store.music.length - 1 : store.current - 1)
    case 1: // 随机播放
      return (store.current = Math.floor(Math.random() * store.music.length))
    case 2: // 单曲循环
      audio.currentTime = 0
      return playMusic()
  }
}

// 下一首音乐
const nextMusic = () => {
  switch (store.mode) {
    case 0: // 循环播放
      return (store.current = store.current === store.music.length - 1 ? 0 : store.current + 1)
    case 1: // 随机播放
      return (store.current = Math.floor(Math.random() * store.music.length))
    case 2: // 单曲循环
      audio.currentTime = 0
      return playMusic()
  }
}

// 下载音乐
const saveMusic = () => {
  const a = document.createElement('a')
  a.href = store.music[store.current].url
  a.download = store.music[store.current].title + '.mp3'
  a.click()
  a.remove()
}

// 监听 audio 事件
audio.addEventListener('play', () => {
  state.play = true
})
audio.addEventListener('pause', () => {
  state.play = false
})
audio.addEventListener('waiting', () => {
  state.loading = true
})
audio.addEventListener('canplay', () => {
  state.loading = false
})
audio.addEventListener('durationchange', getMusicDuration)
audio.addEventListener('timeupdate', getMusicTime)
audio.addEventListener('ended', nextMusic)

onMounted(async () => {
  await getUser()
  await getPlayList()
})
</script>
