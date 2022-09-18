<!--
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-18 19:37:03
 * @Description: bilibili 信息监控
-->
<template>
  <!-- 设置-->
  <Setting :setting="setting" :config="config" />
  <!-- 页面内容 -->
  <article class="flex-col-center">
    <img class="object-contain" :src="config.image" />
  </article>
</template>

<!-- TODO 插件 image -->
<script setup>
import { reactive } from 'vue'
import { storage } from '~/storage'

import Setting from '@/components/setting.vue'

// 初始化 storage
const { get } = storage()

// 设置信息
const setting = [
  {
    id: 'image',
    label: '图像链接',
    type: 'text',
    options: {
      len: 5,
    },
  },
  {
    id: 'local',
    label: '本地图像',
    type: 'button',
    options: {
      text: '浏 览',
      click: () => {
        console.log('click')
      },
    },
  },
]

const config = reactive({
  image: get('image', 'https://monit.fzf404.art/icon.png'),
  local: '',
})
</script>
