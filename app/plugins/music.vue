<!--
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-22 21:17:42
 * @Description: music 网易云音乐播放
-->
<template>
  <!-- 设置 -->
  <Setting :setting="setting" :config="config" @save="getPlayList" />
  <!-- 页面内容 -->
  <article class="grid grid-cols-5 grid-rows-5 gap-x-3 gap-y-1 p-3">
    <!-- head image -->
    <section class="flex-col-center col-span-1 row-span-3 mt-4">
      <img
        :src="state.playList[state.current].image"
        class="w-5/6 rounded-full ring-4 ring-white"
        :class="{ 'animate-[rotating_2s_linear_infinite]': state.play }"
      />
    </section>
    <!-- music info  -->
    <section class="flex-col-center-left col-span-2 row-span-3 mt-4">
      <h1 class="text-md w-full whitespace-nowrap overflow-x-auto">{{ state.playList[state.current].title }}</h1>
      <p class="text-intro text-xs">{{ state.playList[state.current].author }}</p>
    </section>
    <!-- play list -->
    <section class="flex-col-left col-span-2 row-span-5 overflow-x-auto overflow-y-scroll space-y-2 mt-3">
      <p
        v-for="(item, index) in state.playList"
        class="flex-row-center space-x-px clickable"
        @click="state.current = index"
      >
        <MusicSVG class="h-4 stroke-current text-theme" />
        <span class="clickable whitespace-nowrap text-gray text-xs">
          {{ item.title }}
        </span>
      </p>
    </section>
    <!-- play control -->
    <section class="flex-row-center relative col-span-3 row-span-2 pt-4">
      <span class="absolute -top-2 left-0 text-intro text-xs">{{ state.control.current }}</span>
      <span class="absolute -top-2 right-0 text-intro text-xs">{{ state.control.duration }}</span>
      <p
        class="absolute rounded-full top-3 left-0 h-1 bg-theme clickable"
        :style="{ width: state.control.process + '%' }"
      ></p>
      <p
        class="absolute rounded-full w-full top-3 h-1 opacity-25 bg-theme clickable"
        @click="
          (event) => {
            audio.currentTime = (event.offsetX / event.target.offsetWidth) * audio.duration
          }
        "
      ></p>
      <PrevSVG class="w-10" @click="prevMusic" />
      <PauseSVG
        class="w-10"
        v-if="state.play"
        @click="
          () => {
            audio.pause()
            state.play = false
          }
        "
      />
      <PlaySVG
        class="w-10"
        v-else
        @click="
          () => {
            audio.play()
            state.play = true
          }
        "
      />
      <NextSVG class="w-10" @click="nextMusic" />
    </section>
  </article>
</template>

<!-- TODO 插件 music -->
<script setup>
import { onMounted, reactive, watch } from 'vue'

import axios from '~/request'

import Setting from '@/components/setting.vue'

import MusicSVG from '@/assets/music/music.svg'
import NextSVG from '@/assets/music/next.svg'
import PauseSVG from '@/assets/music/pause.svg'
import PlaySVG from '@/assets/music/play.svg'
import PrevSVG from '@/assets/music/prev.svg'

// 初始化 axios
let request = axios('https://qlapi.sylu.edu.cn/cloudmusic')

// Audio 实例
const audio = new Audio()

// 状态信息
const state = reactive({
  play: false, // 播放状态
  current: 0, // 当前歌曲索引
  // 播放列表
  playList: [
    {
      id: null,
      url: null,
      title: null,
      author: null,
      image: null,
    },
  ],
  // 音乐控制器
  control: {
    current: null,
    duration: null,
    process: null,
  },
})

const config = reactive({
  url: '', // 请求地址
  id: '', // 歌单ID
})

const setting = [
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
      click: () => {},
    },
  },
]

watch(
  () => config.url,
  (val) => {
    request = axios(val)
  }
)

watch(
  () => state.current,
  (val) => {
    audio.src = state.playList[val].url
    audio.play()
    state.play = true
  }
)

// 读取歌单信息
const getPlayList = async () => {
  const data = await request.get('/playlist/track/all?id=' + config.id)
  // 解析歌曲信息
  state.playList = data.songs.map((item) => {
    return {
      id: item.id,
      url: 'https://music.163.com/song/media/outer/url?id=' + item.id,
      title: item.name,
      author: item.ar.map((item) => item.name).join('/'),
      image: item.al.picUrl,
    }
  })

  state.current = 0
  audio.url = state.playList[0].url
}

// 获取音乐信息
const getMusicTime = () => {
  // 总时长
  let durationMinutes = Math.floor(audio.duration / 60)
  let durationSeconds = Math.floor(audio.duration - durationMinutes * 60)
  // 当前时长
  let currentMinutes = Math.floor(audio.currentTime / 60)
  let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60)
  // 播放进度
  let progress = (audio.currentTime / audio.duration) * 100

  if (durationSeconds < 10) {
    durationSeconds = '0' + durationSeconds
  }

  if (currentSeconds < 10) {
    currentSeconds = '0' + currentSeconds
  }

  state.control = {
    current: currentMinutes + ':' + currentSeconds,
    duration: durationMinutes + ':' + durationSeconds,
    process: progress,
  }
}

const setMusicTime = (event) => {
  let progress = event.offsetX / event.target.offsetWidth
  audio.currentTime = progress * audio.duration
}
// 上一首
const prevMusic = () => {
  if (state.current === 0) {
    state.current = state.playList.length - 1
  } else {
    state.current--
  }
}

// 下一首
const nextMusic = () => {
  if (state.current === state.playList.length - 1) {
    state.current = 0
  } else {
    state.current++
  }
}

// 监听 audio 修改
audio.addEventListener('timeupdate', getMusicTime)

audio.addEventListener('ended', nextMusic)

onMounted(async () => {
  await getPlayList()
})
</script>

<style scoped></style>
