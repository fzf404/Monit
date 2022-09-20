<!--
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-20 10:20:46
 * @Description: image 图像展示
-->
<template>
  <!-- 设置-->
  <Setting :setting="setting" :config="config" />
  <!-- 页面内容 -->
  <article class="flex-col-center">
    <img class="w-full h-full rounded-lg object-contain" :src="config.src" alt="图像" />
  </article>
</template>

<script setup>
import { reactive } from 'vue'
import { storage } from '~/storage'

import { callEvent } from '#/ipc'
import Setting from '@/components/setting.vue'

// 初始化 storage
const { get } = storage()

// 设置信息
const setting = [
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
      click: () => {
        const local = callEvent('open-image')
        if (local) {
          config.src = 'file://' + local
        }
      },
    },
  },
]

const config = reactive({
  src: get('src', 'https://monit.fzf404.art/icon.png'),
})
</script>
