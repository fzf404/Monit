<!--
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-08-01 13:53:00
 * @Description: bilibili 信息监控
-->
<template>
  <main>
    <!-- 菜单 -->
    <Layout />
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
import Layout from '@/layouts/layout.vue'
import Setting from '@/plugins/bilibili.vue'
</script>
