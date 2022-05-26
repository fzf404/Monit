<!--
 * @Author: fzf404
 * @Date: 2022-04-04 16:45:49
 * @LastEditTime: 2022-05-26 17:29:34
 * @Description: 布局
-->
<template>
  <!--布局控制器 -->
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
  <!-- 状态控制器 -->
  <div class="absolute z-20 right-2 space-x-1">
    <!-- 断网提示 -->
    <WifiSVG height="18" class="inline stroke-current text-red-500" v-show="!network" />
    <!-- 设置 -->
    <SettingSVG
      height="16"
      class="inline clickable stroke-current text-blue-500"
      @click="$emit('update:setting', !setting)"
    />
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
  props: ['setting', 'network'],
  emits: ['update:setting'],
  data() {
    return {
      name: this.$route.name,
      top: cget(this.name, 'top', false), // 是否置顶
    }
  },
  created() {
    // 监听置顶
    console.log(this.$route.name)
  },
  methods: {
    // 发送事件
    sendEvent(event, option) {
      return ipcRenderer.send(`${this.name}-${event}`, option)
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


.menu-item {
  @apply h-8 px-2.5 flex justify-between items-center shadow-md rounded-lg bg-white;
}
</style>
