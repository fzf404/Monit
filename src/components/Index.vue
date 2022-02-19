<template>
  <div class="h-screen relative grid grid-cols-10 grid-rows-5 py-3 text-white">
    <!-- 窗口控制器 -->
    <div class="absolute left-2 space-x-1">
      <!-- 关闭窗口 -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height="14"
        class="inline no-drag"
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
        class="inline no-drag"
        @click="sendEvent('window-mini')"
      >
        <path
          d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM168 232C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H168z"
          fill="#FBBF24"
        ></path>
      </svg>
      <!-- 置顶窗口 -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="14" class="inline no-drag" @click="changeTop">
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
        class="inline no-drag"
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
    <!-- follower -->
    <div class="flex-col-center col-span-6 row-span-3">
      <div class="text-intro m-0.5">follower</div>
      <div class="flex-row-center-bottom">
        <!-- github ico -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
          class="mb-1 mr-1"
          :class="{ 'h-12': follower < 1000, 'h-10': follower > 999 }"
        >
          <path
            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
            fill="#60A5FA"
          ></path>
        </svg>
        <!-- follower number -->
        <span :class="{ 'text-6xl': follower < 1000, 'text-5xl': follower > 999 }">
          {{ follower }}
        </span>
        <!-- follower change -->
        <span
          class="text-4xl text-gray-400 no-drag"
          :class="{ 'text-green-400': follower < newFollower, 'text-red-400': follower > newFollower }"
          @click="handleFollower"
        >
          {{ followerChange }}
        </span>
      </div>
    </div>
    <!-- repo -->
    <div class="flex-col-center-left col-span-4 row-span-5 ml-2 overflow-y-scroll no-drag">
      <div class="flex-row-center" v-for="(value, index) in repoChange" :key="index" @click="handleRepo(value.repo)">
        <!-- star ico -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="13" class="mr-1.5">
          <path
            d="M448 336v-288C448 21.49 426.5 0 400 0H96C42.98 0 0 42.98 0 96v320c0 53.02 42.98 96 96 96h320c17.67 0 32-14.33 32-31.1c0-11.72-6.607-21.52-16-27.1v-81.36C441.8 362.8 448 350.2 448 336zM143.1 128h192C344.8 128 352 135.2 352 144C352 152.8 344.8 160 336 160H143.1C135.2 160 128 152.8 128 144C128 135.2 135.2 128 143.1 128zM143.1 192h192C344.8 192 352 199.2 352 208C352 216.8 344.8 224 336 224H143.1C135.2 224 128 216.8 128 208C128 199.2 135.2 192 143.1 192zM384 448H96c-17.67 0-32-14.33-32-32c0-17.67 14.33-32 32-32h288V448z"
            fill="#34D399"
          ></path>
        </svg>
        <span>
          <span class="font-mono text-md mr-1" :class="{ 'text-sm': value.star > 999 }">
            {{ value.star }}
          </span>
          <span class="font-mono text-sm text-gray-400">
            {{ value.repo.length > 12 ? value.repo.slice(0, 10) + '..' : value.repo }}
          </span>
        </span>
      </div>
    </div>
    <!-- star -->
    <div class="flex-col-center col-span-3 row-span-2">
      <div class="text-intro">star</div>
      <div class="flex-row-center-bottom">
        <!-- star ico -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          class="mr-0.5 mb-1.5"
          :class="{ 'h-6': star < 1000, 'h-5': star > 999 }"
        >
          <path
            d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z"
            fill="#FBBF24"
          ></path>
        </svg>
        <!-- star number -->
        <span :class="{ 'text-3xl': star < 1000, 'text-2xl': star > 999 }">
          {{ star }}
        </span>
        <!-- star change -->
        <span
          class="text-2xl text-gray-400 no-drag"
          :class="{ 'text-green-400': star < newStar, 'text-red-400': star > newStar }"
          @click="handleStar"
          >{{ starChange }}</span
        >
      </div>
    </div>
    <!-- fork -->
    <div class="flex-col-center col-span-3 row-span-2">
      <div class="text-intro">fork</div>
      <div class="flex-row-center-bottom">
        <!-- fork ico -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="mr-1 mb-1.5"
          :class="{ 'h-6': fork < 1000, 'h-5': fork > 999 }"
        >
          <path
            d="M160 80C160 112.8 140.3 140.1 112 153.3V192C112 209.7 126.3 224 144 224H304C321.7 224 336 209.7 336 192V153.3C307.7 140.1 288 112.8 288 80C288 35.82 323.8 0 368 0C412.2 0 448 35.82 448 80C448 112.8 428.3 140.1 400 153.3V192C400 245 357 288 304 288H256V358.7C284.3 371 304 399.2 304 432C304 476.2 268.2 512 224 512C179.8 512 144 476.2 144 432C144 399.2 163.7 371 192 358.7V288H144C90.98 288 48 245 48 192V153.3C19.75 140.1 0 112.8 0 80C0 35.82 35.82 0 80 0C124.2 0 160 35.82 160 80V80zM80 104C93.25 104 104 93.25 104 80C104 66.75 93.25 56 80 56C66.75 56 56 66.75 56 80C56 93.25 66.75 104 80 104zM368 104C381.3 104 392 93.25 392 80C392 66.75 381.3 56 368 56C354.7 56 344 66.75 344 80C344 93.25 354.7 104 368 104zM224 408C210.7 408 200 418.7 200 432C200 445.3 210.7 456 224 456C237.3 456 248 445.3 248 432C248 418.7 237.3 408 224 408z"
            fill="#F87171"
          ></path>
        </svg>
        <!-- fork number -->
        <span :class="{ 'text-3xl': fork < 1000, 'text-2xl': fork > 999 }">{{ fork }}</span>
        <!-- fork change -->
        <span
          class="text-2xl text-gray-400 no-drag"
          :class="{ 'text-green-400': fork < newFork, 'text-red-400': fork > newFork }"
          @click="handleFork"
          >{{ forkChange }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import request from '../utils/request'
import { shell, ipcRenderer } from 'electron'
import Store from 'electron-store'
import { getArrDiffKey } from '../utils/utils'

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

      star: 0,
      newStar: 0,
      fork: 0,
      newFork: 0,
      repoInfo: [],
      newRepoInfo: [],
      follower: 0,
      newFollower: 0,
    }
  },
  created() {
    // 读取用户名
    this.user = store.get('user') === undefined ? 'fzf404' : store.get('user')
    // 数据未初始化, 则初始化数据
    if ((store.get('star') && store.get('fork') && store.get('follower') && store.get('repo')) === undefined) {
      this.initGithubData()
    } else {
      // 读取缓存，并刷新数据
      this.star = store.get('star')
      this.newStar = this.star
      this.fork = store.get('fork')
      this.newFork = this.fork
      this.follower = store.get('follower')
      this.newFollower = this.follower
      this.repoInfo = store.get('repo')
      this.newRepoInfo = this.repoInfo
      this.getGithubData()
    }
  },
  mounted() {
    // 每 60s 重新获取信息
    setInterval(() => {
      this.getGithubData()
    }, 60 * 1000)
  },
  computed: {
    // follow 数据更改
    followerChange() {
      const changeNum = this.newFollower - this.follower
      if (changeNum >= 0) {
        return '+' + changeNum
      }
      return changeNum
    },
    // fork 数据更改
    forkChange() {
      const changeNum = this.newFork - this.fork
      if (changeNum >= 0) {
        return '+' + changeNum
      }
      return changeNum
    },
    // star 数据更改
    starChange() {
      const changeNum = this.newStar - this.star
      if (changeNum >= 0) {
        return '+' + changeNum
      }
      return changeNum
    },
    // repo 数据更改
    repoChange() {
      let repoInfo = this.repoInfo
      // 排序
      repoInfo.sort((a, b) => {
        return b.star - a.star
      })
      return repoInfo
    },
  },
  methods: {
    // 初始化数据
    initGithubData() {
      request(`/users/${this.user}`)
        .then((data) => {
          this.network = true // 修改网络状态
          const follower = data.followers
          let star = 0,
            fork = 0,
            repoInfo = [],
            pages = Math.ceil(data.public_repos / 100)
          this.follower = follower
          this.newFollower = follower
          store.set('follower', follower) // 保存 follow 数据
          // repo 信息
          while (pages--) {
            request(`/users/${this.user}/repos?per_page=100`).then((data) => {
              // 遍历数据
              data.forEach((item) => {
                star += item.stargazers_count
                fork += item.forks_count
                repoInfo.push({ repo: item.name, star: item.stargazers_count, fork: item.forks_count })
              })
              this.star = star
              this.newStar = star
              store.set('star', star) // 保存 star 数
              this.fork = fork
              this.newFork = fork
              store.set('fork', fork) // 保存 fork 数
              this.repoInfo = repoInfo
              this.newRepoInfo = repoInfo
              store.set('repo', repoInfo)
            })
          }
        })
        .catch(() => {
          if (this.network) {
            this.network = false
          }
        })
    },
    // 请求数据
    getGithubData() {
      request(`/users/${this.user}`)
        .then((data) => {
          this.network = true // 修改网络状态
          this.newFollower = data.followers
          // repo 信息
          let fork = 0,
            star = 0,
            repoInfo = [],
            pages = Math.ceil(data.public_repos / 100)
          // 循环 repo
          while (pages--) {
            request(`/users/${this.user}/repos?per_page=100`).then((data) => {
              // 遍历数据
              data.forEach((item) => {
                star += item.stargazers_count
                fork += item.forks_count
                repoInfo.push({ repo: item.name, star: item.stargazers_count, fork: item.forks_count })
              })
              this.newStar = star
              this.newFork = fork
              this.newRepoInfo = repoInfo
            })
          }
        })
        .catch(() => {
          if (this.network) {
            this.network = false
          }
        })
    },
    // 更改用户
    changeUser() {
      this.initGithubData()
      this.showDialog = false
      store.set('user', this.user)
    },

    // 前往查看 follower
    handleFollower() {
      this.follower = this.newFollower
      store.set('follower', this.newFollower) // 保存 follow 数据
      shell.openExternal(`https://github.com/${this.user}?tab=followers`, '_blank')
    },

    // 前往查看 repo
    handleRepo(repo) {
      shell.openExternal(`https://github.com/${this.user}/${repo}`, '_blank')
    },

    // 更新 star
    handleStar() {
      this.star = this.newStar
      store.set('star', this.newStar) // 保存 star 数
      // 查找 star 变化的仓库
      getArrDiffKey(this.repoInfo, this.newRepoInfo, 'star').forEach((item) => {
        // 访问
        shell.openExternal(`https://github.com/${this.user}/${item.repo}/stargazers`, '_blank')
      })
      // 更新 repo
      this.repoInfo = this.newRepoInfo
      store.set('repo', this.newRepoInfo)
    },
    // 重置 fork
    handleFork() {
      this.fork = this.newFork
      store.set('fork', this.newFork) // 保存 fork 数
      // 查找 star 变化的仓库
      getArrDiffKey(this.repoInfo, this.newRepoInfo, 'fork').forEach((item) => {
        // 访问
        shell.openExternal(`https://github.com/${this.user}/${item.repo}/network/members`, '_blank')
      })
      // 更新 repo
      this.repoInfo = this.newRepoInfo
      store.set('repo', this.newRepoInfo)
    },
    // 切换置顶
    changeTop() {
      this.isTop = !this.isTop
      this.sendEvent('window-top')
    },
    // 关闭窗口
    sendEvent(e) {
      ipcRenderer.send(e)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex-col-center {
  @apply flex flex-col flex-wrap justify-center items-center;
}

.flex-col-center-left {
  @apply flex flex-col flex-nowrap items-start;
}
.flex-row-center {
  @apply flex flex-row flex-nowrap justify-center items-center;
}
.flex-row-center-bottom {
  @apply flex flex-row flex-nowrap items-end;
}
.text-intro {
  @apply font-mono text-gray-400;
}
</style>
