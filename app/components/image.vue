<!--
 * @Author: fzf404
 * @Date: 2022-09-23 20:37:31
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-28 22:58:52
 * @Description: iamge 组件
-->
<template>
  <section v-show="show" class="modal z-30 flex-col-center space-y-2">
    <img class="h-2/3" :src="image" alt="图像" />
    <p class="w-full bg-theme text-center text-lg">{{ remark }}</p>
  </section>
</template>

<script setup>
const props = defineProps(['show', 'image', 'remark'])
</script>
