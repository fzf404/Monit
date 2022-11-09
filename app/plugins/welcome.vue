<!--
 * @Author: fzf404
 * @Date: 2022-05-30 15:14:46
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-11-09 19:33:47
 * @Description: welcome 用户指引
-->
<template>
  <!-- 引导页 -->
  <article class="flex-col-center space-y-3">
    <!-- 欢迎-->
    <h1 class="text-light mt-4 text-lg">欢迎使用</h1>
    <!-- 提示 -->
    <p class="text-intro">右击托盘中的<FaviconSVG class="mx-1 mb-0.5 inline w-5" />图标</p>
    <p class="text-intro">打开插件设置启动插件</p>
    <!-- Github 跳转 -->
    <button class="btn btn-sq btn-sm btn-purple text-purple-100" @click="sendEvent('win-open', 'config')">
      <SettingSVG class="w-6" />
    </button>
  </article>
</template>

<script setup>
import { sendEvent } from '#/ipc'

import FaviconSVG from '@/assets/favicon.svg'
import SettingSVG from '@/assets/layout/setting.svg'
</script>
