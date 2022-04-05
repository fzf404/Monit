<template>
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
</template>

<script>
import { shell, ipcRenderer } from 'electron'
import Store from 'electron-store'
import request from '../utils/request'
import { getArrDiffKey } from '../utils/statistic'

const store = new Store()

export default {
  props: ['user'],
  data() {
    return {
      star: 0, // 旧 star 数
      newStar: 0, // 新 star 数
      fork: 0,
      newFork: 0,
      repoInfo: [],
      newRepoInfo: [],
      follower: 0,
      newFollower: 0,
    }
  },
  created() {
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
    // 更新 follower
    handleFollower() {
      this.follower = this.newFollower
      store.set('follower', this.newFollower) // 保存 follow 数据
      shell.openExternal(`https://github.com/${this.user}?tab=followers`, '_blank')
    },
    // 更新 repo
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
    // 更新 fork
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
  // 监听用户修改
  watch: {
    user() {
      this.initGithubData()
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
