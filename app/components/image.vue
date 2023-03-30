<!--
 * @Author: fzf404
 * @Date: 2022-09-23 20:37:31
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-30 11:09:21
 * @Description: iamge 组件
-->

<template>
  <section v-show="show" class="flex-col-center modal z-30 gap-2">
    <!-- 图像 -->
    <img class="h-2/3" :src="image" alt="图像" />
    <!-- 备注 -->
    <p class="bg-theme text-light w-full text-center text-lg">{{ remark }}</p>
  </section>
</template>

<script setup lang="ts">
interface Props {
  show?: boolean
  image?: string
  remark?: string
}
withDefaults(defineProps<Props>(), {
  show: true,
  image: 'https://img.fzf404.art/Monit/qrcode.webp',
  remark: '请扫码前往 Monit 官网！'
})
</script>
