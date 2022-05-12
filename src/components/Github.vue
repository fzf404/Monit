<template>
  <!-- follower -->
  <div class="flex-col-center col-span-6 row-span-3">
    <div class="text-intro m-1">follower</div>
    <div class="flex-row-center-bottom">
      <!-- github svg -->
      <GihubSVG
        class="mr-1.5 mb-1 stroke-current text-blue-400"
        :class="{ 'h-12': follower < 1000, 'h-10': follower > 999 }"
      />
      <!-- follower number -->
      <span :class="{ 'text-6xl': follower < 1000, 'text-5xl': follower > 999 }">
        {{ follower }}
      </span>
      <!-- follower change -->
      <span
        class="text-4xl text-gray-400 clickable"
        :class="{ 'text-green-400': follower < newFollower, 'text-red-400': follower > newFollower }"
        @click="handleFollower"
      >
        {{ followerChange }}
      </span>
    </div>
  </div>
  <!-- repo -->
  <div class="flex-col-center-left col-span-4 row-span-5 ml-1 overflow-y-scroll clickable">
    <div class="flex-row-center" v-for="(value, index) in repoChange" :key="index" @click="handleRepo(value.repo)">
      <!-- repo svg -->
      <RepoSVG height="16" class="mr-1 stroke-current text-green-400" />
      <span>
        <span class="font-mono text-md mr-1" :class="{ 'text-sm': value.star > 999 }">
          {{ value.star }}
        </span>
        <span class="font-mono text-sm text-gray-400">
          {{ value.repo.length > 14 ? value.repo.slice(0, 12) + '..' : value.repo }}
        </span>
      </span>
    </div>
  </div>
  <!-- star -->
  <div class="flex-col-center col-span-3 row-span-2">
    <div class="text-intro">star</div>
    <div class="flex-row-center-bottom">
      <!-- star svg -->
      <StarSVG class="mr-1 mb-1.5 stroke-current text-yellow-400" :class="{ 'h-6': star < 1000, 'h-5': star > 999 }" />
      <!-- star number -->
      <span :class="{ 'text-3xl': star < 1000, 'text-2xl': star > 999 }">
        {{ star }}
      </span>
      <!-- star change -->
      <span
        class="text-2xl text-gray-400 clickable"
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
      <!-- fork svg -->
      <ForkSVG class="mb-1 stroke-current text-red-400" :class="{ 'h-7': fork < 1000, 'h-6': fork > 999 }" />

      <!-- fork number -->
      <span :class="{ 'text-3xl': fork < 1000, 'text-2xl': fork > 999 }">{{ fork }}</span>
      <!-- fork change -->
      <span
        class="text-2xl text-gray-400 clickable"
        :class="{ 'text-green-400': fork < newFork, 'text-red-400': fork > newFork }"
        @click="handleFork"
        >{{ forkChange }}</span
      >
    </div>
  </div>
</template>

<script>
import { shell } from 'electron'
import Store from 'electron-store'
import request from '../utils/request'
import { getArrDiffKey } from '../utils/statistic'

import GihubSVG from '../assets/github/github.svg'
import StarSVG from '../assets/github/star.svg'
import ForkSVG from '../assets/github/fork.svg'
import RepoSVG from '../assets/github/repo.svg'

const store = new Store()

const get = (key) => {
  return store.get('github.' + key)
}
const set = (key, value) => {
  return store.set('github.' + key, value)
}

export default {
  components: {
    GihubSVG,
    StarSVG,
    ForkSVG,
    RepoSVG,
  },
  props: ['user'],
  emits: ['network'],
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
    if ((get('star') && get('fork') && get('follower') && get('repo')) === undefined) {
      this.initGithubData()
    } else {
      // 读取缓存，并刷新数据
      this.star = get('star')
      this.newStar = this.star
      this.fork = get('fork')
      this.newFork = this.fork
      this.follower = get('follower')
      this.newFollower = this.follower
      this.repoInfo = get('repo')
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
          // 修改网络状态
          this.$emit('network', true)

          // 设置 follower
          this.newFollower = data.followers
          this.follower = data.followers
          set('follower', data.followers)

          // 统计 stat fork repo
          let star = 0,
            fork = 0,
            repoInfo = [],
            pages = Math.ceil(data.public_repos / 100)

          // 遍历 repo 信息
          while (pages--) {
            request(`/users/${this.user}/repos?per_page=100`).then((data) => {
              // 遍历数据
              data.forEach((item) => {
                star += item.stargazers_count
                fork += item.forks_count
                repoInfo.push({ repo: item.name, star: item.stargazers_count, fork: item.forks_count })
              })
              // 设置 star
              this.newStar = star
              this.star = star
              set('star', star)
              // 设置 fork
              this.newFork = fork
              this.fork = fork
              set('fork', fork)
              // 设置 repo
              this.newRepoInfo = repoInfo
              this.repoInfo = repoInfo
              set('repo', repoInfo)
            })
          }
        })
        .catch(() => {
          this.$emit('network', false)
        })
    },
    // 请求数据
    getGithubData() {
      request(`/users/${this.user}`)
        .then((data) => {
          // 修改网络状态
          this.$emit('network', true)

          // 设置 follower 信息
          this.newFollower = data.followers

          // 统计 stat fork repo
          let fork = 0,
            star = 0,
            repoInfo = [],
            pages = Math.ceil(data.public_repos / 100)

          // 遍历 repo 信息
          while (pages--) {
            request(`/users/${this.user}/repos?per_page=100`).then((data) => {
              // 遍历数据
              data.forEach((item) => {
                star += item.stargazers_count
                fork += item.forks_count
                repoInfo.push({ repo: item.name, star: item.stargazers_count, fork: item.forks_count })
              })
              // 设置数据
              this.newStar = star
              this.newFork = fork
              this.newRepoInfo = repoInfo
            })
          }
        })
        .catch(() => {
          this.$emit('network', false)
        })
    },
    // 更新 follower
    handleFollower() {
      this.follower = this.newFollower
      set('follower', this.newFollower) // 保存 follow 数据
      shell.openExternal(`https://github.com/${this.user}?tab=followers`, '_blank')
    },
    // 更新 repo
    handleRepo(repo) {
      shell.openExternal(`https://github.com/${this.user}/${repo}`, '_blank')
    },
    // 更新 star
    handleStar() {
      this.star = this.newStar
      set('star', this.newStar) // 保存 star 数
      // 查找 star 变化的仓库
      getArrDiffKey(this.repoInfo, this.newRepoInfo, 'star').forEach((item) => {
        // 访问
        shell.openExternal(`https://github.com/${this.user}/${item.repo}/stargazers`, '_blank')
      })
      // 更新 repo
      this.repoInfo = this.newRepoInfo
      set('repo', this.newRepoInfo)
    },
    // 更新 fork
    handleFork() {
      this.fork = this.newFork
      set('fork', this.newFork) // 保存 fork 数
      // 查找 star 变化的仓库
      getArrDiffKey(this.repoInfo, this.newRepoInfo, 'fork').forEach((item) => {
        // 访问
        shell.openExternal(`https://github.com/${this.user}/${item.repo}/network/members`, '_blank')
      })
      // 更新 repo
      this.repoInfo = this.newRepoInfo
      set('repo', this.newRepoInfo)
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
