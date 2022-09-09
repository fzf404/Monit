<!--
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-09 12:34:38
 * @Description: bilibili 信息监控
-->
<template>
  <main>
    <!-- 设置-->
    <Setting />
    <!-- 页面内容 -->
    <article class="h-screen flex-col-center">
      <h1 class="text-lg">Bilibili</h1>
    </article>
  </main>
</template>

<!-- TODO 插件 bilibili -->
<script setup>
import Setting from '@/plugins/bilibili.vue'
</script>
