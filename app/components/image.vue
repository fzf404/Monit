<!--
 * @Author: fzf404
 * @Date: 2022-09-23 20:37:31
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-11-10 14:30:10
 * @Description: iamge 组件
-->
<template>
  <section v-show="show" class="flex-col-center modal z-30 space-y-2">
    <!-- 图像 -->
    <img class="h-2/3" :src="image" alt="图像" />
    <!-- 备注 -->
    <p class="bg-theme text-light w-full text-center text-lg">{{ remark }}</p>
  </section>
</template>

<script setup lang="ts">
defineProps(['show', 'image', 'remark'])
</script>
