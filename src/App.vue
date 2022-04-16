<template>
  <Layout />
</template>

<script>
import Layout from './components/Layout.vue'

export default {
  name: 'App',
  components: {
    Layout,
  },
}
</script>

<style>
body {
  /* 禁用文字选择 */
  -webkit-user-selet: none;
  /* 允许拖拽移动窗口 */
  -webkit-app-region: drag;
}

input,
button,
.clickable {
  /* 禁止拖拽移动窗口 响应点击事件 */
  -webkit-app-region: no-drag;
  /* 更改鼠标样式 */
  cursor: pointer;
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
}
</style>
