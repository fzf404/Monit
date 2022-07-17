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
