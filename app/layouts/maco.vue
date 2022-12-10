<!--
 * @Author: fzf404
 * @Date: 2022-05-23 17:03:20
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-12-10 20:00:35
 * @Description: maco 布局
-->
<template>
  <nav class="z-50">
    <!-- 窗口控制器 -->
    <ul class="absolute left-2 space-x-1">
      <!-- 关闭 -->
      <CloseSVG
        class="btn-svg text-deep w-3.5 rounded-full bg-red-400 p-0.5 hover:bg-red-500"
        @click="sendEvent('win-close')"
      />
      <!-- 最小化 -->
      <MiniSVG
        class="btn-svg text-deep w-3.5 rounded-full bg-yellow-400 p-0.5 hover:bg-yellow-500"
        @click="sendEvent('win-mini')"
      />
      <!-- 置顶 -->
      <UpSVG
        class="btn-svg text-deep w-3.5 rounded-full bg-green-400 p-0.5 hover:bg-green-500"
        :class="{ 'rotate-180': store.top }"
        @click="store.top = !store.top"
      />
    </ul>
    <!-- 状态控制器 -->
    <ul class="absolute right-2 space-x-1">
      <!-- 断网提示 -->
      <WifiSVG v-show="!pinia.hasNetwork" class="btn-svg w-4 text-red-400" />
      <!-- 布局 -->
      <MacoSVG class="btn-svg w-4 text-teal-400 hover:text-teal-600" @click="store.layout = layout.wine.name" />
      <!-- 主题 -->
      <DarkSVG
        v-if="store.theme === theme.dark.class"
        class="btn-svg w-4 text-indigo-400 hover:text-indigo-500"
        @click="store.theme = theme.punk.class"
      />
      <PunkSVG
        v-else-if="store.theme === theme.punk.class"
        class="btn-svg w-4 text-yellow-400 hover:text-yellow-500"
        @click="store.theme = theme.light.class"
      />
      <LightSVG
        v-else
        class="btn-svg w-4 text-orange-400 hover:text-orange-500"
        @click="store.theme = theme.dark.class"
      />
      <!-- 设置 -->
      <SettingSVG
        v-show="pinia.hasSetting"
        class="btn-svg w-4 text-blue-400 hover:text-blue-500"
        @click="pinia.toggleSetting()"
      />
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
