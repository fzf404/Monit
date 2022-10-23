<!--
 * @Author: fzf404
 * @Date: 2022-09-23 20:37:31
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-10-23 21:44:06
 * @Description: iamge 组件
-->
<template>
  <section v-show="show" class="flex-col-center modal z-30 space-y-2">
    <!-- 图像 -->
    <img class="h-2/3" :src="image" alt="图像" />
    <!-- 备注 -->
    <p class="w-full bg-theme text-center text-lg">{{ remark }}</p>
  </section>
</template>

<script setup lang="ts">
defineProps(['show', 'image', 'remark'])
</script>
