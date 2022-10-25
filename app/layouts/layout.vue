<!--
 * @Author: fzf404
 * @Date: 2022-08-12 10:39:12
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-10-23 21:46:18
 * @Description: 布局切换
-->
<template>
  <!-- 布局 -->
  <component :is="layout[store.layout]" :state="store"></component>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue'

import { sendEvent } from '#/ipc'
import { storage } from '~/storage'

import maco from './maco.vue'
import wine from './wine.vue'

// 布局
const layout = {
  maco,
  wine,
}

const store = storage(
  {
    top: false, // 置顶
    layout: 'maco', // 布局
    theme: 'dark', //主题
  },
  {
    top: (val) => {
      sendEvent('win-top', val)
    },
    theme: (val) => {
      document.body.classList = [val]
    },
  }
)

onMounted(() => {
  document.body.classList = [store.theme]
})
</script>
