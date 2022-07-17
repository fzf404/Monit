<!--
 * @Author: fzf404
 * @Date: 2022-07-15 22:55:49
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-17 16:29:21
 * @Description: live2d 虚拟角色追踪
-->
<template>
  <Layout />
  <!-- 页面内容 -->
  <article class="h-screen flex justify-center items-center">
    <video ref="character"></video>
  </article>
</template>

<!-- TODO -->
<script setup>
import { ref } from 'vue'
import Layout from '../layouts/custom.vue'

character = ref(null)
</script>
