<!--
 * @Author: fzf404
 * @Date: 2022-07-15 22:55:49
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-22 00:46:07
 * @Description: live2d 虚拟角色追踪
-->
<template>
  <main>
    <!-- 窗口控制器 -->
    <Layout />
    <!-- 页面内容 -->
    <article class="h-screen flex-col-center">
      <video ref="character"></video>
    </article>
  </main>
</template>

<!-- TODO 插件 live2d -->
<script setup>
import Layout from '@/layouts/maco.vue'
import { ref } from 'vue'

const character = ref(null)
</script>
