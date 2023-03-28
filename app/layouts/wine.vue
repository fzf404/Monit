<!--
 * @Author: fzf404
 * @Date: 2022-07-22 00:24:58
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-23 20:41:42
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
        @click="pinia.toggleSetting()" />
      <!-- 主题 -->
      <component
        :is="theme.icon"
        class="hover-dynamic btn-svg w-5"
        :class="{
          'text-indigo-400 ': theme.name == 'dark',
          'text-orange-400': theme.name == 'light',
          'text-yellow-400 ': theme.name == 'punk'
        }"
        @click="store.theme = theme.next" />
      <!-- 布局 -->
      <component
        :is="layout.icon"
        class="hover-dynamic btn-svg w-5 text-green-400"
        @click="store.layout = layout.next" />
      <!-- 断网提示 -->
      <WifiSVG v-show="!pinia.hasNetwork" class="hover-dynamic btn-svg w-5 text-red-400" />
    </ul>
    <!-- 窗口控制器 -->
    <ul class="absolute right-2">
      <!-- 置顶 -->
      <UpSVG
        class="btn-svg hover-dynamic w-5 text-green-400"
        :class="{ 'rotate-180': !store.top }"
        @click="store.top = !store.top" />
      <!-- 最小化 -->
      <MiniSVG class="btn-svg hover-dynamic w-5 text-yellow-400" @click="sendEvent('plugin-mini')" />
      <!-- 关闭 -->
      <CloseSVG class="btn-svg hover-dynamic w-5 text-red-400" @click="sendEvent('plugin-close')" />
    </ul>
  </nav>
</template>

<script setup>
import CloseSVG from '@/assets/layout/close.svg'
import MiniSVG from '@/assets/layout/mini.svg'
import SettingSVG from '@/assets/layout/setting.svg'
import UpSVG from '@/assets/layout/up.svg'
import WifiSVG from '@/assets/layout/wifi.svg'
import { main } from '@/pinia'
import { sendEvent } from '~/event/send'

// 初始化 pinia
const pinia = main()

// 初始化 props
defineProps(['layout', 'theme', 'store'])
</script>
