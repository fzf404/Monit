<!--
 * @Author: fzf404
 * @Date: 2022-05-23 17:03:20
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-10-31 14:11:24
 * @Description: maco 布局
-->
<template>
  <nav class="z-50">
    <!-- 窗口控制器 -->
    <ul class="absolute left-2 space-x-1">
      <!-- 关闭 -->
      <CloseSVG
        class="w-3.5 p-0.5 rounded-full btn-svg bg-red-400 hover:bg-red-500 text-dark"
        @click="sendEvent('win-close')"
      />
      <!-- 最小化 -->
      <MiniSVG
        class="w-3.5 p-0.5 rounded-full btn-svg bg-yellow-400 hover:bg-yellow-500 text-dark"
        @click="sendEvent('win-mini')"
      />
      <!-- 置顶 -->
      <UpSVG
        class="w-3.5 p-0.5 rounded-full btn-svg bg-green-400 hover:bg-green-500 text-dark"
        :class="{ 'rotate-180': store.top }"
        @click="store.top = !store.top"
      />
    </ul>
    <!-- 状态控制器 -->
    <ul class="absolute right-2 space-x-1">
      <!-- 断网提示 -->
      <WifiSVG v-show="!pinia.hasNetwork" class="w-4 btn-svg text-red-400" />
      <!-- 布局 -->
      <MacoSVG class="w-4 btn-svg text-cyan-500 hover:text-cyan-600" @click="store.layout = layout.wine.name" />
      <!-- 主题 -->
      <LightSVG
        v-if="store.theme === theme.dark.class"
        class="w-4 btn-svg text-orange-400 hover:text-orange-500"
        @click="store.theme = theme.light.class"
      />
      <PunkSVG
        v-else-if="store.theme === theme.light.class"
        class="w-4 btn-svg text-yellow-300 hover:text-yellow-400"
        @click="store.theme = theme.punk.class"
      />
      <DarkSVG
        v-else
        class="w-4 btn-svg text-indigo-300 hover:text-indigo-400"
        @click="store.theme = theme.dark.class"
      />
      <!-- 设置 -->
      <SettingSVG v-show="pinia.hasSetting" class="w-4 btn-svg text-blue-400" @click="pinia.toggleSetting()" />
    </ul>
  </nav>
</template>

<script setup>
import { sendEvent } from '#/ipc'

import { main } from '@/pinia'

import CloseSVG from '@/assets/layout/close.svg'
import MiniSVG from '@/assets/layout/mini.svg'
import UpSVG from '@/assets/layout/up.svg'

import MacoSVG from '@/assets/layout/maco.svg'

import DarkSVG from '@/assets/layout/dark.svg'
import LightSVG from '@/assets/layout/light.svg'
import PunkSVG from '@/assets/layout/punk.svg'

import SettingSVG from '@/assets/layout/setting.svg'
import WifiSVG from '@/assets/layout/wifi.svg'

// 初始化 pinia
const pinia = main()

// 初始化 props
defineProps(['layout', 'theme', 'store'])
</script>
