<!--
 * @Author: fzf404
 * @Date: 2022-04-04 16:45:49
 * @LastEditTime: 2022-05-30 17:27:12
 * @Description: 布局
-->
<template>
  <!-- 窗口控制器 -->
  <div class="absolute z-10 left-2">
    <!-- 关闭 -->
    <CloseSVG height="17" class="menu-svg clickable text-red-400" @click="sendEvent('window-close')" />
    <!-- 最小化 -->
    <MiniSVG height="17" class="menu-svg clickable text-yellow-400" @click="sendEvent('window-mini')" />
    <!-- 置顶 -->
    <DownSVG height="17" v-if="top" class="menu-svg clickable text-green-400" @click="changeTop" />
    <UpSVG height="17" v-if="!top" class="menu-svg clickable text-green-400" @click="changeTop" />
  </div>
  <!-- 状态控制器 -->
  <div class="absolute z-20 right-2 space-x-1">
    <!-- 断网提示 -->
    <WifiSVG height="17" class="menu-svg text-red-500" v-show="!network" />
    <!-- 设置 -->
    <SettingSVG height="15" class="menu-svg clickable text-blue-500" @click="$emit('update:setting', !setting)" />
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

import { cget } from '../../common/storage'

import CloseSVG from '../assets/menu/close.svg'
import MiniSVG from '../assets/menu/mini.svg'
import DownSVG from '../assets/menu/down.svg'
import UpSVG from '../assets/menu/up.svg'

import WifiSVG from '../assets/menu/wifi.svg'
import SettingSVG from '../assets/menu/setting.svg'

export default {
  components: {
    CloseSVG,
    MiniSVG,
    DownSVG,
    UpSVG,
    WifiSVG,
    SettingSVG,
  },
  props: {
    setting: {
      type: Boolean,
      default: false,
    },
    network: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:setting'],
  data() {
    return {
      name: this.$route.name,
      top: false, // 是否置顶
    }
  },
  created() {
    // 获取默认置顶状态
    this.top = cget(this.name, 'top', false)
  },
  methods: {
    // 发送事件
    sendEvent(event, option) {
      return ipcRenderer.send(event, option)
    },
    // 切换置顶
    changeTop() {
      this.top = !this.top
      this.sendEvent(`window-top`, this.top)
    },
  },
}
</script>

<style>
.menu-svg {
  @apply inline stroke-current;
}
.setting-container {
  @apply absolute z-10 inset-0 flex justify-center items-center bg-black bg-opacity-50;
}
.setting-box {
  @apply w-56 z-50 p-3 pb-2 space-y-2 ring-4 ring-opacity-50 rounded-lg ring-purple-400 bg-gray-200;
}
.setting-item {
  @apply h-8 px-2.5 flex justify-between items-center shadow-md rounded-lg bg-white;
}
.setting-item label {
  @apply text-gray-500 font-sans text-xs;
}
.setting-item input[type='checkbox'] {
  @apply w-4 h-4 mr-0.5;
}
.setting-item input[type='text'] {
  @apply w-28 my-2 px-2 py-1 outline-none shadow-inner rounded-md bg-gray-200 text-purple-400 focus:text-purple-500 font-sans text-xs;
}
.setting-save {
  @apply flex justify-end items-center;
}
.setting-save button {
  @apply px-3 py-1 outline-none shadow-md rounded-lg bg-purple-500 hover:bg-purple-600 text-purple-100 font-sans text-xs font-bold;
}
</style>
