<!--
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-17 21:34:25
 * @Description: music 网易云音乐
-->

<template>
  <!-- 设置 -->
  <Setting :store="store" :setting="setting" @save="getPlayList" />
  <!-- 图像展示 -->
  <Image :show="state.login.show" remark="请使用网易云音乐扫码登录！" :image="state.login.qrcode" />
  <!-- 加载中 -->
  <Loading :show="state.loading" :remark="['正在加载中...']" />
  <!-- 页面内容 -->
  <article class="grid grid-cols-5 grid-rows-5 gap-x-3 gap-y-1 p-3 pt-6">
    <!-- 封面图 -->
    <section class="flex-col-center col-span-1 row-span-3">
      <img
        :src="state.music.image"
        class="h-14 w-14 rounded-full ring-4 ring-white"
        :class="{ 'animate-[rotating_2s_linear_infinite]': state.play }" />
    </section>
    <!-- 音乐信息  -->
    <section class="flex-col-center-left col-span-2 row-span-3">
      <h1 class="text-primary text-md h-7 w-full overflow-x-auto whitespace-nowrap">
        {{ state.music.title }}
      </h1>
      <p class="font-intro max-h-9 w-full overflow-y-auto text-xs">{{ state.music.author }}</p>
    </section>
    <!-- 播放列表 -->
    <section class="flex-col-left-scroll col-span-2 row-span-5 space-y-2">
      <p
        v-for="(item, index) in store.music"
        class="flex-row-center clickable space-x-1"
        @click=";(store.current = index) && loadMusic(true)">
        <MusicSVG class="btn-svg text-theme h-4" v-if="item.id !== state.music.id" :id="item.id" />
        <SoundSVG class="btn-svg text-theme h-4" v-else :id="item.id" />
        <span
          class="whitespace-nowrap text-xs"
          :class="item.id === state.music.id ? 'text-primary font-bold' : 'text-secondary'">
          {{ item.title }}
        </span>
      </p>
    </section>
    <!-- 音乐控制 -->
    <section class="flex-row-center relative col-span-3 row-span-2 pt-4">
      <!-- 已播放时间 -->
      <span class="font-intro absolute -top-2 left-0 text-xs">{{ state.control.current }}</span>
      <!-- 未播放时间 -->
      <span class="font-intro absolute -top-2 right-0 text-xs">{{ state.control.duration }}</span>
      <!-- 进度条 -->
      <p
        class="bg-theme clickable absolute left-0 top-3 h-1 rounded-full"
        :style="{ width: state.control.process + '%' }"></p>
      <!-- 底部进度条 -->
      <p class="bg-theme clickable absolute top-3 h-1 w-full rounded-full opacity-40"></p>
      <!-- 播放进度调整 -->
      <p
        class="clickable absolute top-2 h-3 w-full rounded-full opacity-40"
        @click="
          (event) => {
            audio.currentTime = (event.offsetX / event.target.offsetWidth) * audio.duration
          }
        "></p>
      <!-- 循环播放 -->
      <RepeatSVG class="text-secondary btn-svg absolute left-0 w-5" v-if="store.mode === 0" @click="store.mode = 1" />
      <!-- 随机播放 -->
      <ShuffleSVG
        class="text-secondary btn-svg absolute left-0 w-5"
        v-else-if="store.mode === 1"
        @click="store.mode = 2" />
      <!-- 单曲循环 -->
      <SingleSVG class="text-secondary btn-svg absolute left-0 w-5" v-else @click="store.mode = 0" />
      <!-- 上一首 -->
      <PrevSVG class="text-primary btn-svg w-10" @click="prevMusic" />
      <!-- 暂停 -->
      <PauseSVG class="text-primary btn-svg w-10" v-if="state.play" @click="pauseMusic" />
      <!-- 播放 -->
      <PlaySVG class="text-primary btn-svg w-10" v-else @click="playMusic" />
      <!-- 下一首 -->
      <NextSVG class="text-primary btn-svg w-10" @click="nextMusic" />
      <!-- 下载音乐 -->
      <DownloadSVG class="text-secondary btn-svg absolute right-0 w-5" @click="saveMusic" />
    </section>
  </article>
</template>

<script setup>
import { onMounted, reactive } from 'vue'

import { sendAlert } from '~/event/send'
import axios from '~/lib/request'
import { storage } from '~/lib/storage'

import { main } from '@/pinia'

import Image from '@/components/image.vue'
import Loading from '@/components/loading.vue'
import Setting from '@/components/setting.vue'

import DownloadSVG from '@/assets/plugin/music/download.svg'
import MusicSVG from '@/assets/plugin/music/music.svg'
import NextSVG from '@/assets/plugin/music/next.svg'
import PauseSVG from '@/assets/plugin/music/pause.svg'
import PlaySVG from '@/assets/plugin/music/play.svg'
import PrevSVG from '@/assets/plugin/music/prev.svg'
import RepeatSVG from '@/assets/plugin/music/repeat.svg'
import ShuffleSVG from '@/assets/plugin/music/shuffle.svg'
import SingleSVG from '@/assets/plugin/music/single.svg'
import SoundSVG from '@/assets/plugin/music/sound.svg'

// 初始化全局状态
const pinia = main()

// 初始化音频
const audio = new Audio()

// 播放音量
audio.volume = 0.4

// 状态信息
const state = reactive({
  // 播放状态
  play: false,
  // 加载状态
  loading: false,
  // 登录状态
  login: {
    show: false,
    qrcode: ''
  },
  // 音乐控制器
  control: {
    current: '0:00',
    duration: '0:00',
    process: 0
  },
  // 音乐数据
  music: {
    id: '',
    url: '',
    title: 'Monit',
    author: 'fzf404',
    image: 'https://img.fzf404.art/monit/icon.webp'
  }
})

// 存储数据
const store = storage(
  {
    id: '7667645628', // 歌单编号
    url: 'https://api.fzf404.art/music', // 接口地址
    mode: 0, // 播放模式 0 循环播放 1 随机播放 2 单曲循环
    cookie: '', // 登录信息
    current: 0, // 音乐索引
    music: [] // 音乐列表
  },
  {
    // 接口地址修改
    url: () => {
      location.reload()
    }
  }
)

// 初始化请求
const request = axios(store.url)

// 登录
const login = async () => {
  // 展示加载框
  showLoad()
  // 关闭设置
  pinia.closeSetting()

  // 获取登录密钥
  const { unikey } = (await request.get(`/login/qr/key?timerstamp=${Date.now()}`)).data
  if (!unikey) {
    // 隐藏加载框
    hideLoad()
    // 错误弹窗
    return sendAlert('登录密钥获取失败！')
  }

  // 获取登录二维码
  const { qrimg } = (await request.get(`/login/qr/create?qrimg=true&timerstamp=${Date.now()}&key=${unikey}`)).data
  // 设置登录二维码
  state.login.qrcode = qrimg
  // 展示登录二维码
  state.login.show = true

  // 隐藏加载框
  hideLoad()

  // 轮询登录状态
  const callback = setInterval(async () => {
    // 获取登录状态
    const data = await request.get(`/login/qr/check?timerstamp=${Date.now()}&key=${unikey}`)
    // 登录成功
    if (data.code === 803) {
      clearInterval(callback) // 撤销轮询
      store.cookie = data.cookie // 设置 Cookie
      state.login.show = false // 隐藏登录二维码
      await getUser() // 获取用户信息
      pinia.openSetting() // 展示设置
    }
  }, 1000)

  // 超时时间 60 秒
  setTimeout(() => {
    clearInterval(callback) // 撤销轮询
    state.login.show = false // 隐藏登录二维码
    pinia.openSetting() // 展示设置
  }, 60000)
}

// 设置项
const setting = reactive([
  {
    id: 'url',
    label: '请求地址',
    type: 'text',
    help: 'https://monit.fzf404.art/#/zh/01-guide?id=🎵-music-音乐'
  },
  {
    label: '登录账号',
    type: 'button',
    options: {
      text: '登 陆',
      click: () => {
        login()
      }
    }
  }
])

// 登录状态验证
const getUser = async () => {
  // 展示加载框
  showLoad()

  // 获取账号信息
  const { account } = await request.get(`/user/account?cookie=${store.cookie}`).catch((err) => {
    return sendAlert('获取账号信息失败：' + err.message)
  })
  // 验证登录
  if (!account) {
    // 错误弹窗
    sendAlert('账号过期，请重新登录！')
    // 清空登录信息
    store.cookie = ''
    // 重新登录
    return login()
  }
  // 验证状态
  if (account.status === 0) {
    // 获取歌单列表
    const { playlist } = await request.get(`/user/playlist?uid=${account.id}&cookie=${store.cookie}`)
    // 设置歌单信息
    setting[1] = {
      id: 'id',
      label: '歌单',
      type: 'select',
      options: playlist.map((item) => ({
        label: item.name,
        value: item.id
      }))
    }
    // 隐藏加载框
    hideLoad()
  }
  // 获取歌单音乐
  getPlayList()
}

// 读取歌单信息
const getPlayList = async () => {
  // 展示加载框
  showLoad()
  // 暂停播放
  pauseMusic()

  // 读取歌单音乐
  const { songs } = await request.get(`/playlist/track/all?cookie=${store.cookie}&id=${store.id}`).catch((err) => {
    // 隐藏加载框
    hideLoad()
    // 错误弹窗
    return sendAlert('获取歌单失败：' + err.message)
  })
  // 音乐列表
  const music = songs.map((item) => {
    return {
      id: item.id,
      title: item.name,
      author: item.ar.map((item) => item.name).join('/'),
      image: item.al.picUrl + '?param=100y100'
    }
  })

  // 判断索引越界
  if (store.music.length !== music.length) {
    // 设置当前音乐索引
    store.current = 0
  }

  // 存储音乐
  store.music = music

  // 加载音乐
  loadMusic()
}

// 获得音乐地址
const loadMusic = async (play = false) => {
  // 展示加载框
  showLoad()
  // 获取地址
  const { url } = (
    await request.get(`/song/url/v1?cookie=${store.cookie}&id=${store.music[store.current].id}&level=standard`)
  ).data[0]
  // 判断地址存在
  if (url) {
    // 设置音乐地址
    audio.src = url
    // 设置音乐信息
    state.music = store.music[store.current]
    state.music.url = url
    // 滚动到当前音乐
    document.getElementById(state.music.id).scrollIntoView({ block: 'center', behavior: 'smooth' })
    // 隐藏加载框
    hideLoad()
    // 播放音乐
    play && playMusic()
  } else {
    // 播放下一首
    nextMusic()
  }
}

// 获取播放时间信息
const getMusicTime = () => {
  // 当前时长
  let currentMinutes = Math.floor(audio.currentTime / 60)
  let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60)

  // 播放进度
  let progress = (audio.currentTime / audio.duration) * 100

  if (currentSeconds < 10) {
    currentSeconds = '0' + currentSeconds
  }

  // 设置时长信息
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
    process: 0
  }
}

// 正在加载
const showLoad = () => {
  state.loading = true
}

// 加载完成
const hideLoad = () => {
  state.loading = false
}

// 播放音乐
const playMusic = () => {
  audio.play()
}

// 暂停音乐
const pauseMusic = () => {
  audio.pause()
}

// 上一首音乐
const prevMusic = () => {
  // 判断播放模式
  switch (store.mode) {
    case 0: // 循环播放
      store.current = store.current === 0 ? store.music.length - 1 : store.current - 1
      return loadMusic(true)
    case 1: // 随机播放
      store.current = Math.floor(Math.random() * store.music.length)
      return loadMusic(true)
    case 2: // 单曲循环
      audio.currentTime = 0
      return loadMusic(true)
  }
}

// 下一首音乐
const nextMusic = () => {
  // 判断播放模式
  switch (store.mode) {
    case 0: // 循环播放
      store.current = store.current === store.music.length - 1 ? 0 : store.current + 1
      return loadMusic(true)
    case 1: // 随机播放
      store.current = Math.floor(Math.random() * store.music.length)
      return loadMusic(true)
    case 2: // 单曲循环
      audio.currentTime = 0
      return loadMusic(true)
  }
}

// 下载音乐
const saveMusic = () => {
  // 创建下架元素
  const a = document.createElement('a')
  // 设置下载链接
  a.href = state.music.url
  // 设置文件名
  a.download = state.music.title + '.mp3'
  // 点击下载
  a.click()
  // 移除元素
  a.remove()
}

// 监听播放事件
audio.addEventListener('play', () => {
  state.play = true
})
audio.addEventListener('pause', () => {
  state.play = false
})
audio.addEventListener('waiting', () => {
  showLoad()
})
audio.addEventListener('canplay', () => {
  hideLoad()
})

// 监听错误处理
audio.addEventListener('error', (err) => {
  // 错误弹窗
  sendAlert('音乐加载失败：' + err.message)
  // 暂停播放
  state.play = false
  // 隐藏加载框
  hideLoad()
})

// 监听信息事件
audio.addEventListener('durationchange', getMusicDuration)
audio.addEventListener('timeupdate', getMusicTime)
audio.addEventListener('ended', nextMusic)

onMounted(async () => {
  await getUser()
})
</script>
