<!--
 * @Author: fzf404
 * @Date: 2022-08-12 10:39:12
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2022-11-09 19:18:19
 * @Description: 布局切换
-->
<template>
  <!-- 布局 -->
  <transition name="fade" mode="out-in">
    <component :is="layout[store.layout].component" :layout="layout" :theme="theme" :store="store"></component>
  </transition>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue'

import { sendEvent } from '#/ipc'
import { storage } from '~/storage'

import maco from './maco.vue'
import wine from './wine.vue'

const layout = {
  maco: {
    name: 'maco',
    component: maco,
  },
  wine: {
    name: 'wine',
    component: wine,
  },
}

const theme = {
  dark: {
    class: 'dark',
  },
  light: {
    class: 'light',
  },
  punk: {
    class: 'punk',
  },
}

const store = storage(
  {
    top: false, // 置顶
    layout: layout.maco.name, // 布局
    theme: theme.dark.class, // 主题
  },
  {
    top: (val) => {
      sendEvent('win-top', val)
    },
    theme: (val) => {
      document.body.setAttribute('class', val)
    },
  }
)

onMounted(() => {
  document.body.setAttribute('class', store.theme)
})
</script>
