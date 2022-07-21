<!--
 * @Author: fzf404
 * @Date: 2022-05-30 15:14:46
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-22 00:52:02
 * @Description: welcome 用户指引
-->
<template>
  <main>
    <!-- 窗口控制器 -->
    <Layout />
    <!-- 引导页 -->
    <article class="h-screen flex-col-center space-y-3">
      <!-- 欢迎-->
      <h1 class="mt-4 text-lg">欢迎使用</h1>
      <!-- 提示 -->
      <p class="text-intro">托盘图标中找到<FaviconSVG class="w-5 inline ml-0.5 mb-0.5" /></p>
      <p class="text-intro">在插件列表中启动插件</p>
      <!-- Github 跳转 -->
      <button class="btn btn-sq-sm bg-purple-500 hover:bg-purple-600 text-purple-100" @click="openGithub">
        <GithubSVG class="w-6" />
      </button>
    </article>
  </main>
</template>

<script setup>
import { shell } from 'electron'

import Layout from '@/layouts/macto.vue'

import FaviconSVG from '@/assets/favicon.svg'
import GithubSVG from '@/assets/github/github.svg'

// 打开链接
const openGithub = () => shell.openExternal('https://github.com/fzf404/Monit')
</script>
