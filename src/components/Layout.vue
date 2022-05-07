<!--
 * @Author: fzf404
 * @Date: 2022-04-04 16:45:49
 * @LastEditTime: 2022-05-08 17:15:24
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
    <!-- 模态框 -->
    <div v-if="setting" class="absolute z-10 inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <!-- 设置框 -->
      <div class="z-50 w-56 p-3 pb-2 ring-4 ring-purple-400 ring-opacity-50 rounded-lg bg-gray-200 space-y-2">
        <!-- 开机自启 设置 -->
        <div class="menu-item">
          <label for="auto-open" class="text-gray-500 font-sans text-xs">Auto open</label>
          <input id="auto-open" type="checkbox" class="w-4 h-4 checked:bg-blue-400 checked:border-transparent" v-model.lazy="open" />
        </div>
        <!-- Github 设置 -->
        <div class="menu-item">
          <label for="github-github" class="text-gray-500 font-sans text-xs">Github</label>
          <input
            id="github-github"
            v-model.lazy="github"
            type="text"
            spellcheck="false"
            class="w-28 my-2 px-2 py-1 outline-none shadow-inner border-1 rounded-md bg-gray-200 text-purple-400 focus:text-purple-500 font-sans text-xs"
          />
        </div>
        <!-- 保存 -->
        <div class="flex justify-end items-center">
          <button
            class="px-3 py-1 outline-none shadow-md rounded-lg bg-purple-500 hover:bg-purple-600 text-purple-100 font-sans text-xs font-bold"
            @click="changeSetting"
          >
            OK
          </button>
        </div>
      </div>
    </div>
    <router-view :user="github" @network="network = $event" />
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import Store from 'electron-store'

import CloseSVG from '../assets/menu/close.svg'
import MiniSVG from '../assets/menu/mini.svg'
import DownSVG from '../assets/menu/down.svg'
import UpSVG from '../assets/menu/up.svg'

import WifiSVG from '../assets/menu/wifi.svg'
import SettingSVG from '../assets/menu/setting.svg'

// 设置背景颜色
document.body.style.backgroundColor = process.platform == 'win32' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.4)'

const store = new Store()

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
      open: false, // 开机自启

      top: false, // 置顶
      network: false, // 网络连接情况
      setting: false, // 设置

      github: '', // 用户
      // github: 'fzf404',
      // github: 'SocialSisterYi',
      // github:'yyx990803',
    }
  },
  created() {
    // 读取配置信息
    const open = store.get('open')
    const top = store.get('top')
    const github = store.get('github.user')

    // 判断配置信息是否存在
    if ((github && open && top) === undefined) {
      // 打开设置框
      this.setting = true
    } else {
      // 设置配置信息
      this.github = github
      this.open = open
      this.top = top
    }
  },
  methods: {
    // 更改设置
    changeSetting() {
      store.set('open', this.open)
      store.set('top', this.top)
      store.set('github.user', this.github)

      this.setting = false
    },
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

<style scoped>
.menu-item {
  @apply h-8 px-2.5 flex justify-between items-center shadow-md rounded-lg bg-white;
}
</style>
