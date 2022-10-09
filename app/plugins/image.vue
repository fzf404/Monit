<!--
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-10-09 17:23:46
 * @Description: image 图像展示
-->
<template>
  <!-- 设置-->
  <Setting
    :setting="[
      {
        id: 'src',
        label: '图像链接',
        type: 'text',
      },
      {
        id: 'local',
        label: '本地图像',
        type: 'button',
        options: {
          text: '浏 览',
          click: openLocalImage,
        },
      },
    ]"
    :config="store"
  />
  <!-- 页面内容 -->
  <article class="flex-col-center">
    <!-- TODO 图像缩放 -->
    <img class="w-full h-full rounded-lg object-contain" :src="store.src" alt="图像" />
  </article>
</template>

<script setup>
import { callEvent } from '#/ipc'
import { storage } from '~/storage'

import Setting from '@/components/setting.vue'

// 存储数据
const store = storage({
  src: 'https://cdn.jsdelivr.net/gh/fzf404/image/Monit/logo.webp',
})

// 打开本地图像
const openLocalImage = () => {
  const local = callEvent('open-image')
  if (local) {
    store.src = 'file://' + local
  }
}
</script>
