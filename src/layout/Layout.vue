<!--
 * @Author: fzf404
 * @Date: 2022-04-04 16:45:49
 * @LastEditTime: 2022-05-16 00:11:02
 * @Description: 布局
-->
<template>
  <div class="h-screen relative grid grid-cols-10 grid-rows-5 py-3 text-white">
    <!-- 窗口控制器 -->
    <div class="absolute left-2">
      <!-- 关闭 -->
      <CloseSVG height="18" class="inline clickable stroke-current text-red-400" @click="sendEvent('window-close')" />
      <!-- 最小化 -->
      <MiniSVG height="18" class="inline clickable stroke-current text-yellow-400" @click="sendEvent('window-mini')" />
      <!-- 置顶 -->
      <DownSVG height="18" v-if="top" class="inline clickable stroke-current text-green-400" @click="changeTop" />
      <UpSVG height="18" v-if="!top" class="inline clickable stroke-current text-green-400" @click="changeTop" />
    </div>
    <div class="absolute right-2 space-x-1">
      <!-- 断网提示 -->
      <WifiSVG height="18" class="inline stroke-current text-red-500" v-show="!network" />
      <!-- 设置 -->
      <SettingSVG
        height="16"
        class="inline clickable stroke-current text-blue-500"
        @click="() => (this.setting = true)"
      />
    </div>

    <router-view @network="network = $event" :setting="setting" @onSetting="setting = $event"  />
  </div>
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
  created() {
  },
  methods: {
    // 发送事件
    sendEvent(e, arg) {
      ipcRenderer.send(e, arg)
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
.menu-item {
  @apply h-8 px-2.5 flex justify-between items-center shadow-md rounded-lg bg-white;
}
</style>
