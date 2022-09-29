<!--
 * @Author: fzf404
 * @Date: 2022-05-30 15:14:46
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-29 12:47:32
 * @Description: welcome 用户指引
-->
<template>
  <!-- 引导页 -->
  <article class="flex-col-center space-y-3">
    <!-- 欢迎-->
    <h1 class="mt-4 text-lg">欢迎使用</h1>
    <!-- 提示 -->
    <p class="text-intro">右击托盘中的<FaviconSVG class="w-5 inline mx-1 mb-0.5" />图标</p>
    <p class="text-intro">插件列表中启动插件</p>
    <!-- Github 跳转 -->
    <button class="btn btn-sq btn-sm btn-purple text-purple-100" @click="sendEvent('window-open', 'config')">
      <SettingSVG class="w-6" />
    </button>
  </article>
</template>

<script setup>
import { sendEvent } from '#/ipc'

import FaviconSVG from '@/assets/favicon.svg'
import SettingSVG from '@/assets/layout/setting.svg'
</script>
