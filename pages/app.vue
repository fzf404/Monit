<template>
  <router-view></router-view>
</template>

<script>
// 设置背景颜色
document.body.style.backgroundColor =
  process.platform == ('win32' || 'linux') ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.4)'
</script>

<style>
body {
  /* 禁用文字选择 */
  user-select: none;
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
