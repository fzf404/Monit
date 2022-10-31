<!--
 * @Author: fzf404
 * @Date: 2022-07-22 00:24:58
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-10-31 14:14:48
 * @Description: winer 布局
-->
<template>
  <nav class="z-50">
    <!-- 状态控制器 -->
    <ul class="absolute left-2">
      <!-- 设置 -->
      <SettingSVG
        v-show="pinia.hasSetting"
        class="w-5 hover-dynamic btn-svg text-blue-400"
        @click="pinia.openSetting()"
      />
      <!-- 主题 -->
      <LightSVG
        v-if="store.theme === theme.dark.class"
        class="w-5 hover-dynamic btn-svg text-orange-400"
        @click="store.theme = theme.light.class"
      />
      <PunkSVG
        v-else-if="store.theme === theme.light.class"
        class="w-5 hover-dynamic btn-svg text-yellow-400"
        @click="store.theme = theme.punk.class"
      />
      <DarkSVG v-else class="w-5 hover-dynamic btn-svg text-indigo-300" @click="store.theme = theme.dark.class" />
      <!-- 布局 -->
      <WineSVG class="w-5 hover-dynamic btn-svg text-cyan-500" @click="store.layout = layout.maco.name" />
      <!-- 断网提示 -->
      <WifiSVG v-show="!pinia.hasNetwork" class="w-5 hover-dynamic btn-svg text-red-400" />
    </ul>
    <!-- 窗口控制器 -->
    <ul class="absolute right-2">
      <!-- 置顶 -->
      <UpSVG
        class="w-5 btn-svg hover-dynamic text-green-400"
        :class="{ 'rotate-180': store.top }"
        @click="store.top = !store.top"
      />
      <!-- 最小化 -->
      <MiniSVG class="w-5 btn-svg hover-dynamic text-yellow-400" @click="sendEvent('win-mini')" />
      <!-- 关闭 -->
      <CloseSVG class="w-5 btn-svg hover-dynamic text-red-400" @click="sendEvent('win-close')" />
    </ul>
  </nav>
</template>

<script setup>
import { sendEvent } from '#/ipc'

import { main } from '@/pinia'

import CloseSVG from '@/assets/layout/close.svg'
import MiniSVG from '@/assets/layout/mini.svg'
import UpSVG from '@/assets/layout/up.svg'

import WineSVG from '@/assets/layout/wine.svg'

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
