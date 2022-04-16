<!--
 * @Author: fzf404
 * @Date: 2022-04-04 16:45:49
 * @LastEditTime: 2022-04-16 11:55:36
 * @Description: 布局
-->
<template>
  <div class="h-screen relative grid grid-cols-10 grid-rows-5 py-3 text-white">
    <!-- 窗口控制器 -->
    <div class="absolute left-2 space-x-1">
      <!-- 关闭窗口 -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height="14"
        class="inline clickable"
        @click="sendEvent('window-close')"
      >
        <path
          d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"
          fill="#F87171"
        ></path>
      </svg>
      <!-- 最小化窗口 -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height="14"
        class="inline clickable"
        @click="sendEvent('window-mini')"
      >
        <path
          d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM168 232C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H168z"
          fill="#FBBF24"
        ></path>
      </svg>
      <!-- 置顶窗口 -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height="14"
        class="inline clickable"
        @click="changeTop"
      >
        <path
          v-if="isTop"
          d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM390.6 246.6l-112 112C272.4 364.9 264.2 368 256 368s-16.38-3.125-22.62-9.375l-112-112c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L256 290.8l89.38-89.38c12.5-12.5 32.75-12.5 45.25 0S403.1 234.1 390.6 246.6z"
          fill="#34D399"
        ></path>
        <path
          v-if="!isTop"
          d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM390.6 310.6c-12.5 12.5-32.75 12.5-45.25 0L256 221.3L166.6 310.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l112-112C239.6 147.1 247.8 144 256 144s16.38 3.125 22.62 9.375l112 112C403.1 277.9 403.1 298.1 390.6 310.6z"
          fill="#34D399"
        ></path>
      </svg>
    </div>
    <!-- 设置 -->
    <div class="absolute right-2 space-x-2">
      <!-- 断网提示 -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" height="13" class="inline" v-show="!network">
        <path
          d="M319.1 351.1c-35.35 0-64 28.66-64 64.01s28.66 64.01 64 64.01c35.34 0 64-28.66 64-64.01S355.3 351.1 319.1 351.1zM320 191.1c-70.25 0-137.9 25.6-190.5 72.03C116.3 275.7 115 295.9 126.7 309.2C138.5 322.4 158.7 323.7 171.9 312C212.8 275.9 265.4 256 320 256s107.3 19.88 148.1 56C474.2 317.4 481.8 320 489.3 320c8.844 0 17.66-3.656 24-10.81C525 295.9 523.8 275.7 510.5 264C457.9 217.6 390.3 191.1 320 191.1zM630.2 156.7C546.3 76.28 436.2 32 320 32S93.69 76.28 9.844 156.7c-12.75 12.25-13.16 32.5-.9375 45.25c12.22 12.78 32.47 13.12 45.25 .9375C125.1 133.1 220.4 96 320 96s193.1 37.97 265.8 106.9C592.1 208.8 600 211.8 608 211.8c8.406 0 16.81-3.281 23.09-9.844C643.3 189.2 642.9 168.1 630.2 156.7z"
          fill="#d81e06"
        ></path>
      </svg>
      <!-- 设置按钮 -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height="14"
        class="inline clickable"
        @click="() => (this.showDialog = !this.showDialog)"
      >
        <path
          d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"
          fill="#60A5FA"
        ></path>
      </svg>
      <!-- 设置框 -->
      <div class="relative" v-if="showDialog">
        <div class="absolute right-16 w-64 z-10 py-3 px-4 bg-white rounded-lg">
          <label for="input-user" class="block text-sm font-medium text-gray-400">Github User</label>
          <input
            id="input-user"
            v-model.lazy="user"
            type="text"
            class="my-2 w-full py-1 px-3 bg-purple-100 text-gray-500 shadow-md rounded-md outline-none ring-2 ring-purple-400"
          />
          <button
            @click="changeUser"
            class="bg-purple-500 text-white text-sm mt-0.5 py-1.5 px-4 rounded-lg shadow-md float-right"
          >
            OK
          </button>
        </div>
      </div>
    </div>
    <router-view :user="user" @network="network = $event" />
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import Store from 'electron-store'

// 设置背景颜色
document.body.style.backgroundColor = process.platform == 'win32' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.4)'

const store = new Store()

export default {
  data() {
    return {
      isTop: true, // 置顶
      showDialog: false, // 设置
      network: true, // 网络连接情况

      user: '', // 用户
      // user: 'SocialSisterYi',
      // user:'yyx990803',
    }
  },
  created() {
    // 读取用户名
    this.user = store.get('user') === undefined ? 'fzf404' : store.get('user')
  },
  methods: {
    // 更改用户
    changeUser() {
      this.showDialog = false
      store.set('user', this.user)
    },
    // 发送事件
    sendEvent(e) {
      ipcRenderer.send(e)
    },
    // 切换置顶
    changeTop() {
      this.isTop = !this.isTop
      this.sendEvent('window-top')
    },
  },
}
</script>
