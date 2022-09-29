<!--
 * @Author: fzf404
 * @Date: 2022-09-28 17:05:18
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-28 22:58:58
 * @Description: loading 组件
-->

<template>
  <section v-show="show" class="modal z-30 flex-col-center space-y-2">
    <LoadSVG class="w-16 load-rotating" />
    <p class="text-intro" v-for="item in remark">{{ item }}</p>
  </section>
</template>

<script setup>
import LoadSVG from '@/assets/layout/load.svg'

const props = defineProps(['show', 'remark'])
</script>
