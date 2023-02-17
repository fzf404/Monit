<!--
 * @Author: fzf404
 * @Date: 2022-05-23 17:03:20
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-02-10 22:25:02
 * @Description: maco 布局
-->
<template>
  <nav class="z-50">
    <!-- 窗口控制器 -->
    <ul class="absolute left-2 space-x-1">
      <!-- 关闭 -->
      <CloseSVG
        class="btn-svg text-dark w-3.5 rounded-full bg-red-400 p-0.5 hover:bg-red-500"
        @click="sendEvent('win-close')" />
      <!-- 最小化 -->
      <MiniSVG
        class="btn-svg text-dark w-3.5 rounded-full bg-yellow-400 p-0.5 hover:bg-yellow-500"
        @click="sendEvent('win-mini')" />
      <!-- 置顶 -->
      <UpSVG
        class="btn-svg text-dark w-3.5 rounded-full bg-green-400 p-0.5 hover:bg-green-500"
        :class="{ 'rotate-180': !store.top }"
        @click="store.top = !store.top" />
    </ul>
    <!-- 状态控制器 -->
    <ul class="absolute right-2 space-x-1">
      <!-- 断网提示 -->
      <WifiSVG v-show="pinia.hasNetwork" class="btn-svg w-4 text-red-400 hover:text-red-500" />
      <!-- 布局 -->
      <component
        :is="layout.icon"
        class="btn-svg w-4 text-green-400 hover:text-green-500"
        @click="store.layout = layout.next" />
      <!-- 主题 -->
      <component
        :is="theme.icon"
        class="btn-svg w-4"
        :class="{
          'text-indigo-400 hover:text-indigo-500': theme.name == 'dark',
          'text-orange-400 hover:text-orange-500': theme.name == 'light',
          'text-yellow-400 hover:text-yellow-500': theme.name == 'punk',
        }"
        @click="store.theme = theme.next" />
      <!-- 设置 -->
      <SettingSVG
        v-show="pinia.hasSetting"
        class="btn-svg w-4 text-blue-400 hover:text-blue-500"
        @click="pinia.toggleSetting()" />
    </ul>
  </nav>
</template>

<script setup>
import { sendEvent } from '#/ipc'

import { main } from '@/pinia'

import CloseSVG from '@/assets/layout/close.svg'
import MiniSVG from '@/assets/layout/mini.svg'
import UpSVG from '@/assets/layout/up.svg'

import SettingSVG from '@/assets/layout/setting.svg'
import WifiSVG from '@/assets/layout/wifi.svg'

// 初始化 pinia
const pinia = main()

// 初始化 props
defineProps(['layout', 'theme', 'store'])
</script>
