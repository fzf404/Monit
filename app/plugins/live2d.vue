<!--
 * @Author: fzf404
 * @Date: 2022-07-15 22:55:49
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-18 19:05:05
 * @Description: live2d 虚拟角色追踪
-->
<template>
  <Layout />
  <!-- 页面内容 -->
  <article class="h-screen flex justify-center items-center">
    <section>
      <video ref="character"></video>
    </section>
  </article>
</template>

<!-- TODO -->
<script setup>
import { ref } from 'vue'
import Layout from '../layouts/custom.vue'

const character = ref(null)
</script>
