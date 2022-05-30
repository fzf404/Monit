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
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.6);
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
