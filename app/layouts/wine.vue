<!--
 * @Author: fzf404
 * @Date: 2022-07-22 00:24:58
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-08-12 23:08:20
 * @Description: winer 布局
-->
<template>
  <nav class="layout">
    <!-- 状态控制器 -->
    <ul class="absolute left-1 z-40 space-x-0.5">
      <!-- 设置 -->
      <SettingSVG
        v-show="store.setting.has"
        class="w-5 hover-dynamic btn-svg ml-1 text-blue-500"
        @click="store.setting.show = true"
      />
      <!-- 主题 -->
      <LightSVG
        v-if="state.theme === 'dark'"
        class="w-5 hover-dynamic btn-svg text-orange-400"
        @click="state.theme = 'light'"
      />
      <DarkSVG
        v-else-if="state.theme === 'light'"
        class="w-5 hover-dynamic btn-svg text-indigo-300"
        @click="state.theme = 'dark'"
      />
      <!-- 断网提示 -->
      <WifiSVG v-show="!store.network" class="w-5 hover-dynamic btn-svg text-red-500" />
    </ul>
    <!-- 窗口控制器 -->
    <ul class="absolute right-2 z-40">
      <!-- 置顶 -->
      <UpSVG
        class="w-5 btn-svg hover-dynamic text-green-400"
        :class="{ 'rotate-180': state.top }"
        @click="state.top = !state.top"
      />
      <!-- 最小化 -->
      <MiniSVG class="w-5 btn-svg hover-dynamic text-yellow-400" @click="sendEvent('window-mini')" />
      <!-- 关闭 -->
      <CloseSVG class="w-5 btn-svg hover-dynamic text-red-400" @click="sendEvent('window-close')" />
    </ul>
  </nav>
</template>

<script setup>
import { sendEvent } from '#/ipc'
import { useStore } from '@/store'
import { onMounted, reactive, watch } from 'vue'
import { storage } from '~/storage'

import CloseSVG from '@/assets/layout/close.svg'
import MiniSVG from '@/assets/layout/mini.svg'
import UpSVG from '@/assets/layout/up.svg'

import DarkSVG from '@/assets/layout/dark.svg'
import LightSVG from '@/assets/layout/light.svg'
import SettingSVG from '@/assets/layout/setting.svg'
import WifiSVG from '@/assets/layout/wifi.svg'

// 引入主题样式
import '@/themes/basic.scss'

// 初始化 store
const store = useStore()
// 初始化 storage
const { get, set } = storage()

// 状态数据
const state = reactive({
  top: get('top', false), // 置顶
  theme: get('theme', 'dark'), // 主题
})

// 初始化主题
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
  () => state.theme,
  (val) => {
    set('theme', val)
    document.body.classList = [val]
  }
)
</script>
