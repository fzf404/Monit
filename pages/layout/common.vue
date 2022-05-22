<!--
 * @Author: fzf404
 * @Date: 2022-04-04 16:45:49
 * @LastEditTime: 2022-05-23 00:29:37
 * @Description: 布局
-->
<template>
  <!-- 窗口控制器 -->
  <div class="absolute z-20 left-2">
    <!-- 关闭 -->
    <CloseSVG height="18" class="inline clickable stroke-current text-red-400" @click="sendEvent('window-close')" />
    <!-- 最小化 -->
    <MiniSVG height="18" class="inline clickable stroke-current text-yellow-400" @click="sendEvent('window-mini')" />
    <!-- 置顶 -->
    <DownSVG height="18" v-if="top" class="inline clickable stroke-current text-green-400" @click="changeTop" />
    <UpSVG height="18" v-if="!top" class="inline clickable stroke-current text-green-400" @click="changeTop" />
  </div>
  <div class="absolute z-20 right-2 space-x-1">
    <!-- 断网提示 -->
    <WifiSVG height="18" class="inline stroke-current text-red-500" v-show="!network" />
    <!-- 设置 -->
    <SettingSVG height="16" class="inline clickable stroke-current text-blue-500" @click="setting = !setting" />
  </div>
  <!--  TODO 优化参数传递 -->
  <router-view @onTop="top = $event" @network="network = $event" :setting="setting" @onSetting="setting = $event" />
</template>

<script>
import { ipcRenderer } from 'electron'

import CloseSVG from '../assets/menu/close.svg'
import MiniSVG from '../assets/menu/mini.svg'
import DownSVG from '../assets/menu/down.svg'
import UpSVG from '../assets/menu/up.svg'

import WifiSVG from '../assets/menu/wifi.svg'
import SettingSVG from '../assets/menu/setting.svg'

// 设置背景颜色
document.body.style.backgroundColor =
  process.platform == ('win32' || 'linux') ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.4)'

export default {
  components: {
    CloseSVG,
    MiniSVG,
    DownSVG,
    UpSVG,
    WifiSVG,
    SettingSVG,
  },
  data() {
    return {
      top: false, // 是否置顶

      network: false, // 网络连接情况
      setting: false, // 设置
    }
  },
  methods: {
    // 发送事件
    sendEvent(e, arg) {
      return ipcRenderer.send(e, arg)
    },
    // 切换置顶
    changeTop() {
      this.top = !this.top
      this.sendEvent('window-top', this.top)
    },
  },
}
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

.menu-item {
  @apply h-8 px-2.5 flex justify-between items-center shadow-md rounded-lg bg-white;
}
</style>
