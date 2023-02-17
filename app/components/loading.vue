<!--
 * @Author: fzf404
 * @Date: 2022-09-28 17:05:18
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-02-10 22:49:51
 * @Description: loading 组件
-->
<template>
  <section v-show="show" class="flex-col-center modal z-30 gap-2">
    <!-- 加载动画 -->
    <LoadSVG class="text-light load-rotating w-16" />
    <!-- 备注 -->
    <p class="text-intro" v-if="typeof remark === 'string'">{{ remark }}</p>
    <p class="text-intro" v-else v-for="item in remark">{{ item }}</p>
  </section>
</template>

<script setup lang="ts">
import LoadSVG from '@/assets/layout/load.svg'

interface Props {
  remark?: string | string[]
  show?: boolean
}

withDefaults(defineProps<Props>(), {
  remark: '加载中...',
  show: true,
})
</script>
