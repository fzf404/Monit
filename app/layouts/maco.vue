<!--
 * @Author: fzf404
 * @Date: 2022-05-23 17:03:20
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-01 15:26:58
 * @Description: maco 布局
-->

<template>
  <nav class="z-50">
    <!-- 窗口控制器 -->
    <ul class="absolute left-2 space-x-1">
      <!-- 关闭 -->
      <CloseSVG
        class="btn-svg text-dark w-3.5 rounded-full bg-red-400 p-0.5 hover:bg-red-500"
        @click="sendEvent('plugin-close')" />
      <!-- 最小化 -->
      <MiniSVG
        class="btn-svg text-dark w-3.5 rounded-full bg-yellow-400 p-0.5 hover:bg-yellow-500"
        @click="sendEvent('plugin-mini')" />
      <!-- 置顶 -->
      <UpSVG
        class="btn-svg text-dark w-3.5 rounded-full bg-green-400 p-0.5 hover:bg-green-500"
        :class="{ 'rotate-180': !store.top }"
        @click="store.top = !store.top" />
    </ul>
    <!-- 状态控制器 -->
    <ul class="absolute right-2 space-x-1">
      <!-- 断网提示 -->
      <WifiSVG v-show="!pinia.hasNetwork" class="btn-svg w-4 text-red-400 hover:text-red-500" />
      <!-- 布局 -->
      <component
        :is="layout.icon"
        class="btn-svg w-4 text-green-400 hover:text-green-500"
        @click="store.layout = layout.next" />
      <LockSVG v-if="store.lock" class="btn-svg icon-theme w-4" @click="store.lock = false" />
      <UnlockSVG v-else class="btn-svg icon-theme w-4" @click="store.lock = true" />
      <!-- 主题 -->
      <component :is="theme.icon" class="btn-svg icon-theme w-4" @click="store.theme = theme.next" />
      <!-- 设置 -->
      <SettingSVG
        v-show="pinia.hasSetting"
        class="btn-svg w-4 text-blue-400 hover:text-blue-500"
        @click="pinia.toggleSetting()" />
    </ul>
  </nav>
</template>

<script setup>
import { sendEvent } from '~/event/send'

import { main } from '@/pinia'

import CloseSVG from '@/assets/layout/close.svg'
import MiniSVG from '@/assets/layout/mini.svg'
import SettingSVG from '@/assets/layout/setting.svg'
import UpSVG from '@/assets/layout/up.svg'
import WifiSVG from '@/assets/layout/wifi.svg'
import UnlockSVG from '@/assets/layout/unlock.svg'
import LockSVG from '@/assets/layout/lock.svg'

// 初始化全局状态
const pinia = main()

// 初始化插件值
defineProps(['layout', 'theme', 'store'])
</script>
