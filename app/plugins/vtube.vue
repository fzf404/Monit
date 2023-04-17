<!--
 * @Author: fzf404
 * @Date: 2022-07-15 22:55:49
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-30 10:14:18
 * @Description: vtube 虚拟角色跟踪
-->

<template>
  <!-- 设置-->
  <Setting />
  <!-- 页面内容 -->
  <article class="flex-col-center">
    <h1 class="text-primary text-lg">Live 2D</h1>
    <video ref="character"></video>
  </article>
</template>

<!-- TODO 插件 vtube -->
<script setup>
import { ref } from 'vue'

import Setting from '@/components/setting.vue'

const character = ref(null)
</script>
