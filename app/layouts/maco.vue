<!--
 * @Author: fzf404
 * @Date: 2022-05-23 17:03:20
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-10-03 14:30:45
 * @Description: maco 布局
-->
<template>
  <nav>
    <ul class="absolute z-40 left-2 space-x-1">
      <!-- 关闭 -->
      <CloseSVG
        class="w-3.5 p-0.5 btn-svg rounded-full bg-red-400 hover:bg-red-500 text-dark"
        @click="sendEvent('window-close')"
      />
      <!-- 最小化 -->
      <MiniSVG
        class="w-3.5 p-0.5 btn-svg rounded-full bg-yellow-400 hover:bg-yellow-500 text-dark"
        @click="sendEvent('window-mini')"
      />
      <!-- 置顶 -->
      <UpSVG
        class="w-3.5 p-0.5 btn-svg rounded-full bg-green-400 hover:bg-green-500 text-dark"
        :class="{ 'rotate-180': state.top }"
        @click="state.top = !state.top"
      />
    </ul>
    <!-- 状态控制器 -->
    <ul class="absolute right-2 z-40 space-x-1">
      <!-- 断网提示 -->
      <WifiSVG v-show="!store.network" class="w-4 btn-svg text-red-400" />
      <!-- 布局 -->
      <MacoSVG class="w-4 btn-svg text-cyan-500 hover:text-cyan-600" @click="state.layout = 'wine'" />
      <!-- 主题 -->
      <LightSVG
        v-if="state.theme === 'dark'"
        class="w-4 btn-svg text-orange-400 hover:text-orange-500"
        @click="state.theme = 'light'"
      />
      <PunkSVG
        v-else-if="state.theme === 'light'"
        class="w-4 btn-svg text-yellow-300 hover:text-yellow-400"
        @click="state.theme = 'punk'"
      />
      <DarkSVG v-else class="w-4 btn-svg text-indigo-300 hover:text-indigo-400" @click="state.theme = 'dark'" />
      <!-- 设置 -->
      <SettingSVG v-show="store.setting.has" class="w-4 btn-svg text-blue-400" @click="store.setting.show = true" />
    </ul>
  </nav>
</template>

<script setup>
import { sendEvent } from '#/ipc'
import { useStore } from '@/store'

import CloseSVG from '@/assets/layout/close.svg'
import MiniSVG from '@/assets/layout/mini.svg'
import UpSVG from '@/assets/layout/up.svg'

import MacoSVG from '@/assets/layout/maco.svg'

import DarkSVG from '@/assets/layout/dark.svg'
import LightSVG from '@/assets/layout/light.svg'
import PunkSVG from '@/assets/layout/punk.svg'

import SettingSVG from '@/assets/layout/setting.svg'
import WifiSVG from '@/assets/layout/wifi.svg'

// 初始化 props
const props = defineProps(['state'])

// 初始化 store
const store = useStore()
</script>
