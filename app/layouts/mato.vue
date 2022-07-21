<!--
 * @Author: fzf404
 * @Date: 2022-05-23 17:03:20
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-21 13:17:19
 * @Description: 基础布局
-->

<template>
  <nav>
    <!-- 窗口控制器 -->
    <ul class="z-20 absolute left-2 space-x-px">
      <!-- 关闭 -->
      <CloseSVG class="w-4 inline stroke-current clickable text-red-400" @click="sendEvent('window-close')" />
      <!-- 最小化 -->
      <MiniSVG class="w-4 inline stroke-current clickable text-yellow-400" @click="sendEvent('window-mini')" />
      <!-- 置顶 -->
      <UpSVG
        class="w-4 inline stroke-current clickable text-green-400"
        :class="{ 'rotate-180': state.top }"
        @click="
          () => {
            state.top = !state.top
            sendEvent('window-top', state.top)
          }
        "
      />
    </ul>
    <!-- 状态控制器 -->
    <ul class="z-30 absolute right-2 space-x-1.5">
      <!-- 断网提示 -->
      <WifiSVG v-show="!store.network" class="w-4 inline stroke-current clickable text-red-500" />
      <!-- 主题 -->
      <LightSVG
        v-if="state.theme === 'dark'"
        class="w-4 inline stroke-current clickable text-orange-400"
        @click="state.theme = 'light'"
      />
      <DarkSVG v-else class="w-4 inline stroke-current clickable text-indigo-300" @click="state.theme = 'dark'" />
      <!-- 设置 -->
      <SettingSVG
        class="w-4 inline stroke-current clickable text-blue-500"
        @click="
          () => {
            store.setting = !store.setting
          }
        "
      />
    </ul>
  </nav>
</template>

<script setup>
import { sendEvent } from '#/ipc'
import { useMainStore } from '#/store'
import { reactive, watch, onMounted } from 'vue'
import { storage } from '~/storage'

import CloseSVG from '@/assets/layout/close.svg'
import MiniSVG from '@/assets/layout/mini.svg'
import UpSVG from '@/assets/layout/up.svg'

import LightSVG from '@/assets/layout/light.svg'
import DarkSVG from '@/assets/layout/dark.svg'
import SettingSVG from '@/assets/layout/setting.svg'
import WifiSVG from '@/assets/layout/wifi.svg'

// 引入主题样式
import '@/themes/basic.scss'

// 初始化 store
const store = useMainStore()
// 初始化存储类
const { get, set } = storage()

const state = reactive({
  top: get('top', false),
  theme: get('theme', 'dark'),
})

onMounted(() => {
  document.body.classList = [state.theme]
})

watch(
  () => state.top,
  (val) => {
    set('top', val)
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

<style lang="scss">
// 全局样式
html,
body {
  // 禁用文字选择
  user-select: none;
  // 允许拖拽移动窗口
  -webkit-app-region: drag;

  // 禁止滚动
  overflow: hidden;
  // 隐藏滚动条
  ::-webkit-scrollbar {
    display: none;
  }
}

// 可点击
input,
button,
select,
.clickable {
  // 禁止拖拽移动窗口 响应点击事件
  -webkit-app-region: no-drag;
  // 更改鼠标样式
  cursor: pointer;
}
</style>
