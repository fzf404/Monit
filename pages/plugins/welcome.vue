<!--
 * @Author: fzf404
 * @Date: 2022-05-30 15:14:46
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-05-30 20:03:28
 * @Description: 欢迎 & 指引
-->
<template>
  <Layout />

  <article>
    <h1>欢迎使用</h1>

    <p>请在托盘图标中找到 Monit</p>
    <p>点击插件列表启动插件</p>

    <button @click="openGithub">
      <GithubSVG height="22" />
    </button>
  </article>
</template>

<script setup>
import { shell } from 'electron'
import GithubSVG from '../assets/github/github.svg'
import Layout from '../layout/common.vue'

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
  @apply outline-none rounded p-1 text-sm bg-purple-500 hover:bg-purple-600 text-purple-100;
}
</style>
