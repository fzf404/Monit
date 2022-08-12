<!--
 * @Author: fzf404
 * @Date: 2022-08-12 10:39:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-08-12 23:09:05
 * @Description: 布局切换
-->
<template>
  <component :is="layouts[apply]"></component>
</template>

<script setup>
import Maco from './maco.vue'
import Wine from './wine.vue'

// 布局列表
const layouts = {
  Maco,
  Wine,
}

// 当前布局
const apply = 'Maco'
</script>
