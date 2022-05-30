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
  @apply text-sm items-center text-gray-400;
}
article button {
  @apply p-1 outline-none rounded-md bg-purple-500 hover:bg-purple-700 text-purple-100 text-sm;
}
</style>
