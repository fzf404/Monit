<!--
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-19 23:00:45
 * @Description: music 网易云音乐播放
-->
<template>
  <!-- 设置 -->
  <Setting :setting="setting" :config="config" />
  <!-- 页面内容 -->
  <article class="grid grid-cols-5 grid-rows-5 gap-x-3 gap-y-1 p-3">
    <!-- head image -->
    <section class="flex-col-center col-span-1 row-span-3 mt-4">
      <img
        src="http://p2.music.126.net/mmxNijLGL8v3TK8XDRW_dg==/38482906984174.jpg"
        class="w-5/6 rounded-full ring-4 ring-white"
        :class="{ 'animate-[rotating_2s_linear_infinite]': state.play }"
      />
    </section>
    <!-- music info  -->
    <section class="flex-col-center-left col-span-2 row-span-3 mt-4">
      <h1>XXXXXXX</h1>
      <p class="text-intro">XXX</p>
    </section>
    <!-- play list -->
    <section class="flex-col-left col-span-2 row-span-5 overflow-x-auto overflow-y-scroll mt-1">
      <p v-for="item in state.playList" class="flex-row-center space-x-1 space-y-1 clickable">
        <PlaySVG class="h-4 mt-1 stroke-current text-blue-400" />
        <span class="whitespace-nowrap text-intro">
          {{ item.name }}
        </span>
      </p>
    </section>
    <!-- play control -->
    <section class="flex-row-center relative col-span-3 row-span-2 pt-4">
      <span class="absolute -top-1 left-0 text-intro text-xs">0:00</span>
      <span class="absolute -top-1 right-0 text-intro text-xs">3:00</span>
      <p class="absolute w-full top-3 bg-red-300 h-1 rounded-full"></p>
      <PrevSVG class="w-10" />
      <PauseSVG class="w-10" v-if="state.play" @click="state.play = false" />
      <PlaySVG class="w-10" v-else @click="state.play = true" />
      <NextSVG class="w-10" />
    </section>
  </article>
</template>

<!-- TODO 插件 music -->
<script setup>
import { onMounted, reactive } from 'vue'

import axios from '~/request'
import { storage } from '~/storage'

import Setting from '@/components/setting.vue'

import NextSVG from '@/assets/music/next.svg'
import PauseSVG from '@/assets/music/pause.svg'
import PlaySVG from '@/assets/music/play.svg'
import PrevSVG from '@/assets/music/prev.svg'

// 初始化 storage
const { set, get } = storage()

// 初始化 axios
let request = axios(get('url', 'https://qlapi.sylu.edu.cn/cloudmusic'))

const state = reactive({
  play: false,
  playList: [],
})

const config = reactive({
  id: get('id', ''),
})

const setting = [
  {
    id: 'id',
    label: '歌单ID',
    type: 'text',
  },
]

const getPlayList = async () => {
  const data = await request.get('/playlist/detail?id=' + config.id)
  state.playList = data.playlist.tracks
}

const onSave = () => {
  getPlayList()
}

onMounted(() => {
  getPlayList()
})
</script>

<style scoped></style>
