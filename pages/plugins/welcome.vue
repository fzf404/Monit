<!--
 * @Author: fzf404
 * @Date: 2022-05-30 15:14:46
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-05-30 23:01:22
 * @Description: 欢迎 & 指引
-->
<template>
  <main>
    <!-- 窗口控制器 -->
    <Layout />
    <!-- 引导页 -->
    <article>
      <!-- 欢迎-->
      <h1>欢迎使用</h1>
      <!-- 提示 -->
      <p>托盘图标中找到 <FaviconSVG class="inline h-5 mb-0.5" /></p>
      <p>在插件列表中启动插件</p>
      <!-- Github 跳转 -->
      <button @click="openGithub">
        <GithubSVG height="22" />
      </button>
    </article>
  </main>
</template>

<script setup>
import { shell } from 'electron'

import Layout from '../layout/common.vue'

import FaviconSVG from '../assets/favicon.svg'
import GithubSVG from '../assets/github/github.svg'

// 打开链接
const openGithub = () => shell.openExternal('https://github.com/fzf404/Monit')
</script>

<style scoped>
article {
  @apply h-screen pt-4 flex flex-col justify-center items-center space-y-3;
}
article h1 {
  @apply text-lg text-white;
}
article p {
  @apply text-sm text-gray-400;
}
article button {
  @apply outline-none rounded p-1 bg-purple-500 hover:bg-purple-600 text-purple-100;
}
</style>
