<!--
 * @Author: fzf404
 * @Date: 2022-05-30 15:14:46
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-17 20:58:36
 * @Description: welcome 用户指引
-->

<template>
  <!-- 引导页 -->
  <article class="flex-col-center gap-3 p-4 pt-6">
    <!-- 欢迎-->
    <h1 class="text-primary text-lg">欢迎使用</h1>
    <!-- 提示 -->
    <p class="flex-row-center font-intro">
      <span>右击托盘中的</span>
      <MonitSVG class="mx-1 w-4" />
      <span>图标</span>
    </p>
    <p class="font-intro">打开插件设置启动插件</p>
    <!-- 设置插件 -->
    <button class="btn btn-sq btn-md btn-purple text-purple-100" @click="sendEvent('plugin-create', 'config')">
      <SettingSVG class="w-6" />
    </button>
  </article>
</template>

<script setup>
import { sendEvent } from '~/event/send'

import MonitSVG from '@/assets/monit.svg'
import SettingSVG from '@/assets/layout/setting.svg'
</script>
