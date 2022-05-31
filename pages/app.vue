<!--
 * @Author: fzf404
 * @Date: 2022-05-25 23:36:33
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-05-31 15:59:13
 * @Description: 基础组件
-->

<template>
  <router-view></router-view>
</template>

<style>
body {
  /* 禁用文字选择 */
  user-select: none;
  /* 允许拖拽移动窗口 */
  -webkit-app-region: drag;
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
}

/* TODO 可调透明度 */
#app {
  @apply rounded-lg bg-gray-900 bg-opacity-75 font-sans text-white;
}

input,
button,
.clickable {
  /* 禁止拖拽移动窗口 响应点击事件 */
  -webkit-app-region: no-drag;
  /* 更改鼠标样式 */
  cursor: pointer;
}
</style>
