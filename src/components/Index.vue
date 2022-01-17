<template>
  <!-- 控制器 -->
  <div class="h-screen relative grid grid-cols-3 grid-rows-3 text-white">
    <div class="absolute left-2 top-0.5 space-x-0.5">
      <!-- 关闭窗口 -->
      <svg @click="sendEvent('window-close')" class="inline" viewBox="0 0 1024 1024" height="16">
        <path
          d="M511.667 56.667c251.3 0 455 203.7 455 455s-203.7 455-455 455-455-203.7-455-455 203.7-455 455-455z m181.4 270c-15-15-39.3-15-54.3 0l-126.8 126.8-126.7-126.8c-14.8-14.8-38.8-15-53.9-0.4l-0.5 0.4c-15 15-15 39.3 0 54.3l126.8 126.8-126.7 126.7c-14.8 14.8-15 38.8-0.4 53.9l0.4 0.5c15 15 39.3 15 54.3 0l126.7-126.7 126.7 126.6c14.8 14.8 38.8 15 53.9 0.4l0.5-0.4c15-15 15-39.3 0-54.3l-126.8-126.7 126.7-126.7c14.8-14.8 15-38.8 0.4-53.9l-0.3-0.5z"
          fill="#F87171"
        ></path>
      </svg>
      <!-- 最小化窗口 -->
      <svg @click="sendEvent('window-mini')" class="inline" viewBox="0 0 1024 1024" height="16">
        <path
          d="M511.667 56.667c251.3 0 455 203.7 455 455s-203.7 455-455 455-455-203.7-455-455 203.7-455 455-455z m-218 417c-21 0-38 17-38 38s17 38 38 38h436c21 0 38-17 38-38s-17-38-38-38h-436z"
          fill="#FBBF24"
        ></path>
      </svg>
      <!-- 置顶窗口 -->
      <svg @click="changeTop" class="inline" viewBox="0 0 1024 1024" height="16">
        <path
          v-if="isTop"
          transform="rotate(-90 511.667 511.667)"
          d="M511.667 56.667c251.3 0 455 203.7 455 455s-203.7 455-455 455-455-203.7-455-455 203.7-455 455-455z m141.4 199.2c-15-15-39.3-15-54.3 0l-228.6 228.5c-7.6 7.6-11.3 17.5-11.2 27.4-0.1 9.9 3.7 19.9 11.2 27.4l228.5 228.5c15 15 39.3 15 54.3 0s15-39.3 0-54.3l-201.6-201.5 201.7-201.7c14.8-14.8 15-38.8 0.4-53.9l-0.4-0.4z"
          fill="#34D399"
        ></path>
        <path
          v-if="!isTop"
          transform="rotate(90 511.667 511.667)"
          d="M511.667 56.667c251.3 0 455 203.7 455 455s-203.7 455-455 455-455-203.7-455-455 203.7-455 455-455z m141.4 199.2c-15-15-39.3-15-54.3 0l-228.6 228.5c-7.6 7.6-11.3 17.5-11.2 27.4-0.1 9.9 3.7 19.9 11.2 27.4l228.5 228.5c15 15 39.3 15 54.3 0s15-39.3 0-54.3l-201.6-201.5 201.7-201.7c14.8-14.8 15-38.8 0.4-53.9l-0.4-0.4z"
          fill="#34D399"
        ></path>
      </svg>
    </div>
    <!-- follower -->
    <div class="center col-span-2 row-span-2">
      <div class="text-lg text-gray-200">follower</div>
      <div class="relative">
        <svg
          class="absolute -left-12 top-1.5"
          :class="{ '-left-11': follower > 9999, '-left-14': follower < 9999 }"
          viewBox="0 0 1024 1024"
          height="86%"
        >
          <path
            d="M512 42.666667A464.64 464.64 0 0 0 42.666667 502.186667 460.373333 460.373333 0 0 0 363.52 938.666667c23.466667 4.266667 32-9.813333 32-22.186667v-78.08c-130.56 27.733333-158.293333-61.44-158.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667"
            fill="#60A5FA"
          ></path>
        </svg>
        <span class="text-5xl" :class="{ 'text-4xl': follower > 9999, 'text-6xl': follower < 999 }">{{
          follower
        }}</span>
        <span
          :class="{ 'text-green-400': follower < newFollower, 'text-red-400': follower > newFollower }"
          class="absolute -right-12 bottom-0 text-4xl text-gray-400"
          @click="handleFollower"
          >{{ followerChange }}</span
        >
      </div>
    </div>
    <!-- repo -->
    <div class="center left ml-7 row-span-3 space-y-1">
      <div class="relative text-md" v-for="(value, index) in repoChange" :key="index">
        <svg class="absolute top-1 -left-5" viewBox="0 0 1024 1024" height="70%">
          <path
            d="M810.666667 128H298.666667a128 128 0 0 0-128 128v512a128 128 0 0 0 128 128h512a42.666667 42.666667 0 0 0 42.666666-42.666667V170.666667a42.666667 42.666667 0 0 0-42.666666-42.666667zM298.666667 810.666667a42.666667 42.666667 0 0 1 0-85.333334h469.333333v85.333334z"
            fill="#34D399"
          ></path>
        </svg>
        <span>
          <span class="font-bold">
            {{ value.star }}
          </span>
          <span>
            {{ ' ' }}
          </span>
          <span @click="handleRepo(value.repo)">
            {{ value.repo.length > 8 ? value.repo.slice(0, 6) + '..' : value.repo }}
          </span>
        </span>
      </div>
    </div>
    <!-- star -->
    <div class="center">
      <div class="relative">
        <span class="absolute bottom-9 inset-x-1/3 text-md">star</span>
        <svg class="absolute -left-7 top-1.5" viewBox="0 0 1024 1024" height="70%">
          <path
            d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3-12.3 12.7-12.1 32.9 0.6 45.3l183.7 179.1-43.4 252.9c-1.2 6.9-0.1 14.1 3.2 20.3 8.2 15.6 27.6 21.7 43.2 13.4L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"
            fill="#FBBF24"
          ></path>
        </svg>
        <span class="text-2xl" :class="{ 'text-xl': star > 9999, 'text-3xl': star < 999 }">{{ star }}</span>
        <span
          class="absolute -right-8 bottom-0 text-2xl text-gray-400"
          :class="{ 'text-green-400': star < newStar, 'text-red-400': star > newStar }"
          @click="handleStar"
          >{{ starChange }}</span
        >
      </div>
    </div>
    <!-- fork -->
    <div class="center">
      <div class="relative">
        <span class="absolute bottom-9 inset-x-1/3 text-md">fork</span>
        <svg class="absolute -left-6 top-2" viewBox="0 0 1024 1024" height="60%">
          <path
            d="M640 640H384a63.573333 63.573333 0 0 0-45.952 19.776C402.816 690.56 448 755.584 448 832a192 192 0 0 1-192 192 192 192 0 0 1-192-192c0-83.52 53.568-153.792 128-180.288V372.224C117.568 345.792 64 275.52 64 192a192 192 0 0 1 192-192 192 192 0 0 1 192 192c0 83.52-53.568 153.792-128 180.224v151.552c20.096-7.168 41.408-11.776 64-11.776h256c35.392 0 64-28.608 64-64v-11.776c-74.368-26.432-128-96.704-128-180.224 0-106.048 86.016-192 192-192s192 85.952 192 192c0 83.52-53.632 153.792-128 180.224V448c0 106.048-86.016 192-192 192z m128-448c35.392 0 64 28.608 64 64s-28.608 64-64 64-64-28.608-64-64 28.608-64 64-64zM256 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z m0 640a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
            fill="#F87171"
          ></path>
        </svg>
        <span class="text-2xl" :class="{ 'text-xl': star > 9999, 'text-3xl': star < 999 }">{{ fork }}</span>
        <span
          class="absolute -right-8 bottom-0 text-2xl text-gray-400"
          :class="{ 'text-green-400': fork < newFork, 'text-red-400': fork > newFork }"
          @click="handleFork"
          >{{ forkChange }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { shell, ipcRenderer } from 'electron'
export default {
  name: 'HelloWorld',
  created() {
    // 初始化请求
    // fork 信息
    axios.get(`https://api.github.com/users/${this.user}`).then((res) => {
      this.follower += res.data.followers
      this.newFollower += res.data.followers
      // repo 信息
      let star = 0,
        fork = 0,
        repoInfo = [],
        pages = Math.ceil(res.data.public_repos / 100)
      // 循环 repo
      while (pages--) {
        axios.get(`https://api.github.com/users/${this.user}/repos?per_page=100`).then((res) => {
          // 遍历数据
          res.data.forEach((item) => {
            star += item.stargazers_count
            fork += item.forks_count
            repoInfo.push({ repo: item.name, star: item.stargazers_count, fork: item.forks_count })
          })
          this.star = star
          this.newStar = star
          this.fork = fork
          this.newFork = fork
          this.repoInfo = repoInfo
        })
      }
    })
  },
  mounted() {
    // 每 60s 重新获取信息
    setInterval(() => {
      // fork 信息
      axios.get(`https://api.github.com/users/${this.user}`).then((res) => {
        this.newFollower = res.data.followers
        // repo 信息
        let fork = 0,
          star = 0,
          repoInfo = [],
          pages = Math.ceil(res.data.public_repos / 100)
        // 循环 repo
        while (pages--) {
          axios.get(`https://api.github.com/users/${this.user}/repos?per_page=100`).then((res) => {
            // 遍历数据
            res.data.forEach((item) => {
              star += item.stargazers_count
              fork += item.forks_count
              repoInfo.push({ repo: item.name, star: item.stargazers_count, fork: item.forks_count })
            })
            this.newStar = star
            this.newFork = fork
            this.repoInfo = repoInfo
          })
        }
      })
    }, 60 * 1000)
  },
  data() {
    return {
      isTop: false, // 置顶
      user: 'fzf404', // 用户
      // user: 'SocialSisterYi',
      // user:'yyx990803',
      star: 0,
      newStar: 0,
      fork: 0,
      newFork: 0,
      repoInfo: [],
      follower: 0,
      newFollower: 0,
    }
  },
  methods: {
    // 更改用户
    changeUser(user) {
      this.user = user
    },
    // 前往查看 follower
    handleFollower() {
      this.follower = this.newFollower
      shell.openExternal(`https://github.com/${this.user}?tab=followers`, '_blank')
    },
    handleRepo(repo) {
      shell.openExternal(`https://github.com/${this.user}/${repo}`, '_blank')
    },
    // 清空 star
    handleStar() {
      this.star = this.newStar
    },
    // 清空 fork
    handleFork() {
      this.fork = this.newFork
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
      return repoInfo.slice(0, 6)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center {
  @apply flex flex-col flex-wrap justify-center items-center;
}

.left {
  @apply items-start;
}
</style>
