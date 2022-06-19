<!--
 * @Author: fzf404
 * @Date: 2022-05-23 17:03:20
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-06-20 00:13:31
 * @Description: macos 布局
-->

<template>
  <nav>
    <!-- 窗口控制器 -->
    <ul class="z-10 absolute left-2 space-x-px">
      <!-- 关闭 -->
      <CloseSVG class="h-4 w-4 inline stroke-current clickable text-red-400" @click="sendEvent('window-close')" />
      <!-- 最小化 -->
      <MiniSVG class="h-4 w-4 inline stroke-current clickable text-yellow-400" @click="sendEvent('window-mini')" />
      <!-- 置顶 -->
      <UpSVG
        class="h-4 w-4 inline stroke-current clickable text-green-400"
        :class="top ? '' : 'turn'"
        @click="changeTop"
      />
    </ul>
    <!-- 状态控制器 -->
    <ul class="z-20 absolute right-2 space-x-1.5">
      <!-- 断网提示 -->
      <WifiSVG v-show="!network" class="h-4 w-4 mb-0.5 inline stroke-current clickable text-red-500" />
      <!-- 设置 -->
      <SettingSVG
        class="h-4 w-4 inline stroke-current clickable text-blue-500"
        @click="$emit('update:setting', !setting)"
      />
    </ul>
  </nav>
</template>

<script>
import { ipcRenderer } from 'electron'

import { cget } from '../../common/utils/storage'

import CloseSVG from '../assets/menu/close.svg'
import MiniSVG from '../assets/menu/mini.svg'
import UpSVG from '../assets/menu/up.svg'

import SettingSVG from '../assets/menu/setting.svg'
import WifiSVG from '../assets/menu/wifi.svg'

export default {
  components: {
    CloseSVG,
    MiniSVG,
    UpSVG,
    WifiSVG,
    SettingSVG,
  },
  // 插件传参
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
  // 插件事件
  emits: ['update:setting'],
  data() {
    return {
      name: this.$route.name, // 插件名
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

<style lang="scss">
// 设置窗口样式
.setting-container {
  @apply absolute z-10 inset-0 flex justify-center items-center rounded-lg bg-black bg-opacity-50;

  .setting-box {
    @apply w-56 z-20  px-4 py-3 pb-2 space-y-2 ring-4 ring-opacity-50 rounded-lg ring-purple-400 bg-gray-200;

    .setting-item {
      @apply h-8 px-2.5 flex justify-between items-center shadow rounded bg-white;

      label {
        @apply text-gray-500 text-xs;
      }

      input[type='text'] {
        @apply w-24 px-2 py-1 outline-none border-none shadow-inner rounded text-right text-xs bg-gray-200 text-purple-400 focus:text-purple-500;
      }

      input[type='checkbox'] {
        @apply w-4 h-4 outline-none accent-purple-500;
      }
    }
    .setting-save {
      @apply flex justify-end items-center;
    }
  }
}

// 标准按钮
.btn {
  @apply rounded px-2 py-1;
}
// 小型按钮
.btn-sm {
  @apply rounded px-2 py-1 text-xs;
}
// 超小型按钮
.btn-xs {
  @apply rounded px-1.5 py-0.5 text-xs;
}

// 方形按钮
.btn-square {
  @apply rounded p-1;
}

/* 动画效果 */
.mode-fade-enter-active,
.mode-fade-leave-active {
  transition: opacity 0.2s ease;
}

.mode-fade-enter-from,
.mode-fade-leave-to {
  opacity: 0;
}
</style>
