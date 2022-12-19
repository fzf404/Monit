<!--
 * @Author: fzf404
 * @Date: 2022-07-22 00:24:58
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2022-12-19 18:02:37
 * @Description: winer 布局
-->
<template>
  <nav class="z-50">
    <!-- 状态控制器 -->
    <ul class="absolute left-2">
      <!-- 设置 -->
      <SettingSVG
        v-show="pinia.hasSetting"
        class="hover-dynamic btn-svg w-5 text-blue-400"
        @click="pinia.toggleSetting()"
      />
      <!-- 主题 -->
      <DarkSVG
        v-if="store.theme === theme.dark.class"
        class="hover-dynamic btn-svg w-5 text-indigo-300"
        @click="store.theme = theme.punk.class"
      />
      <PunkSVG
        v-else-if="store.theme === theme.punk.class"
        class="hover-dynamic btn-svg w-5 text-yellow-400"
        @click="store.theme = theme.light.class"
      />
      <LightSVG v-else class="hover-dynamic btn-svg w-5 text-orange-400" @click="store.theme = theme.dark.class" />
      <!-- 布局 -->
      <WineSVG class="hover-dynamic btn-svg w-5 text-teal-500" @click="store.layout = layout.maco.name" />
      <!-- 断网提示 -->
      <WifiSVG v-show="!pinia.hasNetwork" class="hover-dynamic btn-svg w-5 text-red-400" />
    </ul>
    <!-- 窗口控制器 -->
    <ul class="absolute right-2">
      <!-- 置顶 -->
      <UpSVG
        class="btn-svg hover-dynamic w-5 text-green-400"
        :class="{ 'rotate-180': !store.top }"
        @click="store.top = !store.top"
      />
      <!-- 最小化 -->
      <MiniSVG class="btn-svg hover-dynamic w-5 text-yellow-400" @click="sendEvent('win-mini')" />
      <!-- 关闭 -->
      <CloseSVG class="btn-svg hover-dynamic w-5 text-red-400" @click="sendEvent('win-close')" />
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
