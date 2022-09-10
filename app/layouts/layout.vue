<!--
 * @Author: fzf404
 * @Date: 2022-08-12 10:39:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-10 14:37:08
 * @Description: 布局切换
-->
<template>
  <component :is="layout[state.layout]" :state="state"></component>
  <router-view> </router-view>
</template>

<script setup>
import { onMounted, reactive, watch } from 'vue'

import { sendEvent } from '#/ipc'
import { storage } from '~/storage'

import maco from './maco.vue'
import wine from './wine.vue'

// 引入主题样式
import '@/themes/basic.scss'

// 初始化 storage
const { get, set } = storage()

// 布局
const layout = {
  maco,
  wine,
}

const state = reactive({
  top: get('top', false), // 置顶
  layout: get('layout', 'maco'), // 布局
  theme: get('theme', 'dark'), // 主题
})

onMounted(() => {
  document.body.classList = [state.theme]
})

// 监听状态变化
watch(
  () => state.top,
  (val) => {
    set('top', val)
    sendEvent('window-top', state.top)
  }
)

watch(
  () => state.layout,
  (val) => {
    set('layout', val)
  }
)

watch(
  () => state.theme,
  (val) => {
    set('theme', val)
    document.body.classList = [val]
  }
)
</script>
