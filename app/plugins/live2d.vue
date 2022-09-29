<!--
 * @Author: fzf404
 * @Date: 2022-07-15 22:55:49
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-24 21:52:57
 * @Description: live2d 虚拟角色追踪
-->
<template>
  <!-- 页面内容 -->
  <article class="flex-col-center">
    <h1 class="text-lg">Live 2D</h1>
    <video ref="character"></video>
  </article>
</template>

<!-- TODO 插件 live2d -->
<script setup>
import { ref } from 'vue'

// import Setting from '@/components/setting.vue'

const character = ref(null)
</script>
