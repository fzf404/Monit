<!--
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-24 23:37:29
 * @Description: music 网易云音乐播放
-->
<template>
  <!-- 设置 -->
  <Setting
    :setting="[
      {
        id: 'url',
        label: '请求地址',
        type: 'text',
        help: 'https://monit.fzf404.art',
      },
      {
        id: 'id',
        label: '歌单ID',
        type: 'text',
      },
      {
        id: 'login',
        label: '登陆账号',
        type: 'button',
        options: {
          text: '登 陆',
          click: login,
        },
      },
    ]"
    :config="store"
    @save="getPlayList"
  />
  <Image :show="state.login.show" remark="请使用网易云音乐扫码登陆" :image="state.login.qrcode" />
  <!-- 页面内容 -->
  <article class="grid grid-cols-5 grid-rows-5 gap-x-3 gap-y-1 p-3">
    <!-- 封面图 -->
    <section class="flex-col-center col-span-1 row-span-3 mt-4">
      <img
        :src="store.music[store.current].image"
        class="w-5/6 rounded-full ring-4 ring-white"
        :class="{ 'animate-[rotating_2s_linear_infinite]': state.play }"
      />
    </section>
    <!-- 音乐信息  -->
    <section class="flex-col-center-left col-span-2 row-span-3 mt-4">
      <h1 class="text-md w-full whitespace-nowrap overflow-x-auto">{{ store.music[store.current].title }}</h1>
      <p class="text-intro text-xs">{{ store.music[store.current].author }}</p>
    </section>
    <!-- 播放列表 -->
    <section class="flex-col-left col-span-2 row-span-5 overflow-x-auto overflow-y-scroll scrollable space-y-2 mt-3">
      <p
        v-for="(item, index) in store.music"
        class="flex-row-center space-x-px clickable"
        @click="store.current = index"
      >
        <MusicSVG class="h-4 btn-svg text-theme" />
        <span class="whitespace-nowrap text-gray text-xs">
          {{ item.title }}
        </span>
      </p>
    </section>
    <!-- 音乐控制 -->
    <section class="flex-row-center relative col-span-3 row-span-2 pt-4">
      <!-- 已播放时间 -->
      <span class="absolute -top-2 left-0 text-intro text-xs">{{ state.control.current }}</span>
      <!-- 未播放时间 -->
      <span class="absolute -top-2 right-0 text-intro text-xs">{{ state.control.duration }}</span>
      <!-- 底部进度条 -->
      <p
        class="absolute rounded-full top-3 left-0 h-1 bg-theme clickable"
        :style="{ width: state.control.process + '%' }"
      ></p>
      <!-- 顶部进度条 -->
      <p
        class="absolute rounded-full w-full top-3 h-1 opacity-40 bg-theme clickable"
        @click="
          (event) => {
            audio.currentTime = (event.offsetX / event.target.offsetWidth) * audio.duration
          }
        "
      ></p>
      <PrevSVG class="w-10 btn-svg" @click="prevMusic" />
      <PauseSVG class="w-10 btn-svg" v-if="state.play" @click="pauseMusic" />
      <PlaySVG class="w-10 btn-svg" v-else @click="playMusic" />
      <NextSVG class="w-10 btn-svg" @click="nextMusic" />
    </section>
  </article>
</template>

<!-- TODO 插件 music -->
<script setup>
import { onMounted, reactive } from 'vue'
import { storage } from '~/storage'

import axios from '~/request'

import Image from '@/components/image.vue'
import Setting from '@/components/setting.vue'

import { sendAlert } from '#/ipc'
import MusicSVG from '@/assets/music/music.svg'
import NextSVG from '@/assets/music/next.svg'
import PauseSVG from '@/assets/music/pause.svg'
import PlaySVG from '@/assets/music/play.svg'
import PrevSVG from '@/assets/music/prev.svg'

// Axios 实例
let request = null
// Audio 实例
const audio = new Audio()

// 存储数据
const store = storage(
  {
    url: 'https://qlapi.sylu.edu.cn/cloudmusic', // 请求地址

    id: '7479151947', // 歌单ID
    current: 0, // 当前歌曲索引

    // 音乐列表
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
    // 请求地址修改
    url: (val) => {
      request = axios(val)
    },
    // 歌曲索引修改
    current: (val) => {
      audio.src = store.music[val].url
      playMusic()
    },
  }
)

// 初始化 axios
request = axios(store.url)

// 状态信息
const state = reactive({
  // 播放状态
  play: false,
  // 登陆
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

// 登录
const login = async () => {
  sendAlert('正在开发中...')
}

// 读取歌单信息
const getPlayList = async () => {
  const data = await request.get('/playlist/track/all?id=' + store.id)
  if (!data) {
    sendAlert('获取歌单失败！')
    return
  }
  // 解析歌曲信息
  const music = await data.songs.map((item) => {
    return {
      id: item.id,
      url: 'https://music.163.com/song/media/outer/url?id=' + item.id,
      title: item.name,
      author: item.ar.map((item) => item.name).join('/'),
      image: item.al.picUrl,
    }
  })
  // 设置当前歌曲索引
  store.current = 0
  // 设置音乐链接
  audio.src = store.music[store.current].url
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

  state.control = {
    current: '0:00',
    duration: durationMinutes + ':' + durationSeconds,
    process: 0,
  }
}

// 播放音乐
const playMusic = () => {
  audio
    .play()
    .then(() => {
      state.play = true
    })
    .catch(() => {
      sendAlert('网络错误或需要会员！')
    })
}

// 暂停音乐
const pauseMusic = () => {
  audio.pause()
  state.play = false
}

// 上一首
const prevMusic = () => {
  if (store.current === 0) {
    store.current = store.music.length - 1
  } else {
    store.current--
  }
}

// 下一首
const nextMusic = () => {
  if (store.current === store.music.length - 1) {
    store.current = 0
  } else {
    store.current++
  }
}

// 监听 audio 事件
audio.addEventListener('durationchange', getMusicDuration)
audio.addEventListener('timeupdate', getMusicTime)
audio.addEventListener('ended', nextMusic)

onMounted(async () => {
  await getPlayList()
})
</script>
