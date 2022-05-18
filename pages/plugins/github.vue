<template>
  <div class="h-screen relative p-3 grid grid-cols-10 grid-rows-5 text-white">
    <!-- 设置模态框 -->
    <div v-if="setting" class="absolute z-10 inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <!-- 中心框 -->
      <div class="w-56 z-50 p-3 pb-2 space-y-2 ring-4 ring-opacity-50 rounded-lg ring-purple-400 bg-gray-200">
        <!-- 开机自启 设置 -->
        <div class="menu-item">
          <label for="auto-open" class="text-gray-500 font-sans text-xs">Auto open</label>
          <input
            id="auto-open"
            type="checkbox"
            class="w-4 h-4 checked:bg-blue-400 checked:border-transparent"
            v-model.lazy="open"
          />
        </div>
        <!-- Github 设置 -->
        <div class="menu-item">
          <label for="github-github" class="text-gray-500 font-sans text-xs">Github</label>
          <input
            id="github-github"
            v-model.lazy="user"
            type="text"
            spellcheck="false"
            class="w-28 my-2 px-2 py-1 outline-none shadow-inner border-1 rounded-md bg-gray-200 text-purple-400 focus:text-purple-500 font-sans text-xs"
            @keypress="
              (e) => {
                if (e.key === 13) {
                  this.changeSetting()
                }
              }
            "
          />
        </div>
        <!-- 保存 -->
        <div class="flex justify-end items-center">
          <button
            class="px-3 py-1 outline-none shadow-md rounded-lg bg-purple-500 hover:bg-purple-600 text-purple-100 font-sans text-xs font-bold"
            @click="this.changeSetting()"
          >
            OK
          </button>
        </div>
      </div>
    </div>
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
        <StarSVG
          class="mr-1 mb-1.5 stroke-current text-yellow-400"
          :class="{ 'h-6': star < 1000, 'h-5': star > 999 }"
        />
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
  </div>
</template>

<script>
import { shell } from 'electron'
import request from '../utils/request'
import { getArrDiffKey } from '../utils/statistic'
import { cget, cset } from '../../app/storage'

import GihubSVG from '../assets/github/github.svg'
import StarSVG from '../assets/github/star.svg'
import ForkSVG from '../assets/github/fork.svg'
import RepoSVG from '../assets/github/repo.svg'

// 封装获取
const get = (key, def) => {
  return cget('github', key, def)
}

// 封装保存
const set = (key, value) => {
  return cset('github', key, value)
}

export default {
  components: {
    GihubSVG,
    StarSVG,
    ForkSVG,
    RepoSVG,
  },
  props: ['setting'],
  emits: ['network', 'onSetting'],
  data() {
    return {
      open: get('open', false), // 开机自启
      top: get('top', false), // 置顶
      user: get('user', ''), // 用户名

      follower: get('follower', 0), // follower 数
      newFollower: get('follower', 0), // 新 follower 数

      star: get('star', 0), // star 数
      newStar: get('star', 0), // 新 star 数

      fork: get('fork', 0), // fork 数
      newFork: get('fork', 0), // 新 fork 数

      repoInfo: get('repo', []), // repo 信息
      newRepoInfo: get('repo', []), // 新 repo 信息
    }
  },
  created() {
    if (get('user', '') === '') {
      // 打开设置
      this.$emit('onSetting', true)
    } else {
      // 刷新数据
      this.getGithubData()
    }
  },
  mounted() {
    // 每 60s 重新获取信息
    setInterval(() => {
      this.getGithubData()
    }, 60000)
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
    // 设置更改
    changeSetting() {
      // 保存数据
      set('open', this.open)
      set('user', this.user)
      // 初始化数据
      this.initGithubData()
      // 更改设置状态
      this.$emit('onSetting', false)
    },
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
  // watch: {
  //   user() {
  //     this.initGithubData()
  //   },
  // },
}
</script>

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
