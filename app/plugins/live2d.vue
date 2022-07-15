<template>
  <Layout />
  <!-- 页面内容 -->
  <article class="h-screen flex justify-center items-center">
    <video ref="character"></video>
  </article>
</template>

<script setup>
import Layout from '../layout/custom.vue'

character = ref(null)
</script>
