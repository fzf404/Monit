<!--
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2022-11-09 18:31:42
 * @Description: image 图像展示
-->

<template>
  <!-- 设置-->
  <Setting :store="store" :setting="setting" />
  <!-- 页面内容 -->
  <article class="flex-col-center">
    <!-- TODO 图像缩放 -->
    <img class="h-full w-full rounded-lg object-contain" :src="store.src" alt="图像" />
  </article>
</template>

<script setup>
import { reactive } from 'vue'

import { storage } from '~/lib/storage'
import { callEvent } from '~/server/send'

import Setting from '@/components/setting.vue'

// 存储数据
const store = storage({
  src: 'https://img.fzf404.art/Monit/logo.webp'
})

// 打开本地图像
const openLocalImage = () => {
  const local = callEvent('open-image')
  if (local) {
    store.src = 'file://' + local
  }
}

// 设置项
const setting = reactive([
  {
    id: 'src',
    label: '图像链接',
    type: 'text'
  },
  {
    label: '本地图像',
    type: 'button',
    options: {
      text: '浏 览',
      click: openLocalImage
    }
  }
])
</script>
