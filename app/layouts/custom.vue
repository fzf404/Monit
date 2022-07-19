<!--
 * @Author: fzf404
 * @Date: 2022-05-23 17:03:20
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-18 16:04:42
 * @Description: 基础布局
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
        :class="{ 'rotate-180': top }"
        @click="changeTop"
      />
    </ul>
    <!-- 状态控制器 -->
    <ul class="z-20 absolute right-2 space-x-1.5">
      <!-- 断网提示 -->
      <WifiSVG v-show="!network" class="h-4 w-4 mb-0.5 inline stroke-current clickable text-red-500" />
      <!-- 设置 -->
      <SettingSVG
        v-show="setting !== undefined"
        class="h-4 w-4 inline stroke-current clickable text-blue-500"
        @click="$emit('update:setting', !setting)"
      />
    </ul>
  </nav>
</template>

<script>
import { sendEvent } from '../../custom/ipc'

import { cget } from '../../lib/storage'

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
      default: undefined,
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
    // 读取默认置顶状态
    this.top = cget(this.name, 'top', false)
  },
  methods: {
    sendEvent: sendEvent,
    // 切换置顶
    changeTop() {
      this.top = !this.top
      sendEvent(`window-top`, this.top)
    },
  },
}
</script>

<style lang="scss">
// 全局样式
html,
body {
  // 禁用文字选择
  user-select: none;
  // 允许拖拽移动窗口
  -webkit-app-region: drag;

  // 禁止滚动
  overflow: hidden;
  // 隐藏滚动条
  ::-webkit-scrollbar {
    display: none;
  }
}

// TODO 可调透明度
#app {
  @apply rounded-lg bg-black bg-opacity-60 text-white font-sans;
}

// 可点击
input,
button,
select,
.clickable {
  // 禁止拖拽移动窗口 响应点击事件
  -webkit-app-region: no-drag;
  // 更改鼠标样式
  cursor: pointer;
}

// 设置窗口样式
.setting {
  @apply absolute z-10 inset-0 flex justify-center items-center rounded-lg bg-black bg-opacity-50;

  ul {
    @apply w-3/5 z-20 px-4 py-3 pb-2 space-y-2 ring-4 ring-opacity-50 rounded-lg ring-purple-400 bg-gray-200;

    // 设置内容
    li {
      @apply h-8 px-2 flex justify-between items-center shadow rounded bg-white;

      label {
        @apply text-gray-500 text-xs;
      }

      // 去除箭头
      input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }

      input[type='number'],
      input[type='text'] {
        @apply w-3/5 px-2 py-1 outline-none border-none shadow-inner rounded text-right text-xs bg-gray-200 text-purple-400 focus:text-purple-500;
      }

      input[type='checkbox'] {
        @apply w-4 h-4 outline-none accent-purple-500;
      }

      select {
        @apply w-3/5 px-2 py-1 outline-none border-none shadow-inner rounded text-xs bg-gray-200 text-purple-400 focus:text-purple-500;
      }
    }

    // 设置操作
    ol {
      @apply flex justify-end items-center;
      button {
        @apply btn btn-sm bg-purple-500 hover:bg-purple-600;
      }
    }
  }
}

// 设置小窗口样式
.setting-sm {
  ul {
    @apply w-3/4;
  }
}

// 标准按钮
.btn {
  @apply rounded px-2 py-1;
}

// 小型按钮
.btn-sm {
  @apply px-2 py-1 text-xs;
}

// 超小型按钮
.btn-xs {
  @apply px-1.5 py-0.5 text-xs;
}

// 方形按钮
.btn-sq {
  @apply p-1.5;
}

.btn-sq-sm {
  @apply p-1;
}

// 淡入淡出
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// 滑入滑出
.list-enter-active,
.list-leave-active {
  transition: all 0.6s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
