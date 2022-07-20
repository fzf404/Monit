<!--
 * @Author: fzf404
 * @Date: 2022-07-15 22:55:49
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-20 19:44:44
 * @Description: live2d 虚拟角色追踪
-->
<template>
  <Layout />
  <!-- 页面内容 -->
  <article class="h-screen flex-col-center">
    <video ref="character"></video>
  </article>
</template>

<!-- TODO -->
<script setup>
import { ref } from 'vue'
import Layout from '@/layouts/mato.vue'

const character = ref(null)
</script>
