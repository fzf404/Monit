<!--
 * @Author: fzf404
 * @Date: 2022-05-30 15:14:46
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-23 20:33:07
 * @Description: welcome 用户指引
-->
<template>
  <!-- 引导页 -->
  <article class="flex-col-center gap-3 p-4 pt-6">
    <!-- 欢迎-->
    <h1 class="text-light text-lg">欢迎使用</h1>
    <!-- 提示 -->
    <p class="flex-row-center text-intro">
      <span>右击托盘中的</span>
      <FaviconSVG class="mx-1 w-4" />
      <span>图标</span>
    </p>
    <p class="text-intro">打开插件设置启动插件</p>
    <!-- Github 跳转 -->
    <button class="btn btn-sq btn-md btn-purple text-purple-100" @click="sendEvent('win-open', 'config')">
      <SettingSVG class="w-6" />
    </button>
  </article>
</template>

<script setup>
import { sendEvent } from '~/server/send'

import FaviconSVG from '@/assets/favicon.svg'
import SettingSVG from '@/assets/layout/setting.svg'
</script>
