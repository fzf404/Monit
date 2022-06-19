<!--
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-06-19 23:38:43
 * @Description: github 信息监控
-->
<template>
  <main>
    <!-- 窗口控制器 -->
    <Layout :network="network" v-model:setting="setting" />
    <!-- 页面内容 -->
    <article class="h-screen relative grid grid-cols-12 grid-rows-5 p-3">
      <!-- 设置模态框 -->
      <aside class="setting-container" v-show="setting">
        <!-- 中心框 -->
        <ul class="setting-box">
          <!-- 消息通知 设置 -->
          <li class="setting-item">
            <label for="message-notice">消息通知</label>
            <input id="message-notice" type="checkbox" v-model.lazy="notice" />
          </li>
          <!-- Github 用户 -->
          <li class="setting-item">
            <label for="github-username">用户名</label>
            <input
              id="github-username"
              type="text"
              spellcheck="false"
              v-model.lazy="user"
              @keyup.enter="changeSetting"
            />
          </li>
          <!-- 保存 -->
          <li class="setting-save">
            <button class="btn-sm bg-purple-400 hover:bg-purple-500" @click="changeSetting">OK</button>
          </li>
        </ul>
      </aside>
      <!-- follower -->
      <section class="flex-col-center col-span-7 row-span-3 mt-4">
        <h1 pan class="text-intro mb-1">follower</h1>
        <p class="flex-row-center-bottom">
          <!-- github svg -->
          <GihubSVG
            class="mr-1 mb-1 stroke-current text-blue-400"
            :class="{ 'h-9': follower < 1000, 'h-8': follower > 999 }"
          />
          <!-- follower number -->
          <span :class="{ 'text-5xl': follower < 1000, 'text-4xl': follower > 999 }">
            {{ follower }}
          </span>
          <!-- follower change -->
          <span
            class="text-3xl clickable"
            :class="{
              'text-green-400': follower < newFollower,
              'text-red-400': follower > newFollower,
              'text-gray-400': follower == newFollower,
            }"
            @click="updateFollower"
          >
            {{ followerChange }}
          </span>
        </p>
      </section>
      <!-- repo -->
      <section class="flex-col-center-left col-span-5 row-span-5 overflow-x-hidden overflow-y-scroll mt-px">
        <p
          :key="index"
          class="flex-row-center space-x-1 space-y-1 clickable"
          v-for="(value, index) in repoChange"
          @click="updateRepo(value.repo)"
        >
          <!-- repo svg -->
          <RepoSVG class="h-4 mt-1 stroke-current text-green-400" />
          <span class="text-sm">
            {{ value.star }}
          </span>
          <span class="text-intro">
            {{
              value.star > 999
                ? value.repo.length > 10
                  ? value.repo.slice(0, 9) + '..'
                  : value.repo
                : value.repo.length > 12
                ? value.repo.slice(0, 11) + '..'
                : value.repo
            }}
          </span>
        </p>
      </section>
      <!-- star -->
      <section class="flex-col-center col-span-3 row-span-2">
        <h1 class="text-intro">star</h1>
        <p class="flex-row-center-bottom">
          <!-- star svg -->
          <StarSVG
            class="mr-0.5 mb-1.5 stroke-current text-yellow-400"
            :class="{ 'h-5': star < 1000, 'h-4': star > 999 }"
          />
          <!-- star number -->
          <span :class="{ 'text-2xl': star < 1000, 'text-xl': star > 999 }">
            {{ star }}
          </span>
          <!-- star change -->
          <span
            class="text-xl clickable"
            :class="{
              'text-green-400': star < newStar,
              'text-red-400': star > newStar,
              'text-gray-400': star == newStar,
            }"
            @click="updateStar"
            >{{ starChange }}</span
          >
        </p>
      </section>
      <!-- fork -->
      <section class="flex-col-center col-span-4 row-span-2">
        <h1 class="text-intro">fork</h1>
        <p class="flex-row-center-bottom">
          <!-- fork svg -->
          <ForkSVG class="mb-1 stroke-current text-red-400" :class="{ 'h-6': fork < 1000, 'h-5': fork > 999 }" />
          <!-- fork number -->
          <span :class="{ 'text-2xl': fork < 1000, 'text-xl': fork > 999 }">{{ fork }}</span>
          <!-- fork change -->
          <span
            class="text-xl clickable"
            :class="{
              'text-green-400': fork < newFork,
              'text-red-400': fork > newFork,
              'text-gray-400': fork == newFork,
            }"
            @click="updateFork"
            >{{ forkChange }}
          </span>
        </p>
      </section>
    </article>
  </main>
</template>

<script>
import { ipcRenderer, shell } from 'electron'
import { cget, cset } from '../../common/utils/storage'
import axios from '../utils/request'
import { getArrDiffKey } from '../utils/statistic'

import Layout from '../layout/custom.vue'

import ForkSVG from '../assets/github/fork.svg'
import GihubSVG from '../assets/github/github.svg'
import RepoSVG from '../assets/github/repo.svg'
import StarSVG from '../assets/github/star.svg'

// 初始化 axios
const request = axios('https://api.github.com')

// 信息获取
const get = (key, def) => {
  return cget('github', key, def)
}

// 信息保存
const set = (key, value) => {
  return cset('github', key, value)
}

export default {
  components: {
    Layout,
    GihubSVG,
    StarSVG,
    ForkSVG,
    RepoSVG,
  },
  data() {
    return {
      setting: false, // 设置
      network: false, // 网络

      user: get('user', ''), // 用户名
      notice: get('notice', false), // 开启提醒

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
    if (this.user === '') {
      // 打开设置
      this.setting = true
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
      // 发送通知
      if (changeNum != 0) {
        this.sendNotice('follower is changed')
      }
      // 返回更改数
      if (changeNum >= 0) {
        return '+' + changeNum
      } else {
        return changeNum
      }
    },
    // fork 数据更改
    forkChange() {
      const changeNum = this.newFork - this.fork
      if (changeNum != 0) {
        this.sendNotice('fork is changed')
      }
      if (changeNum >= 0) {
        return '+' + changeNum
      } else {
        return changeNum
      }
    },
    // star 数据更改
    starChange() {
      const changeNum = this.newStar - this.star
      if (changeNum != 0) {
        this.sendNotice('star is changed')
      }
      if (changeNum >= 0) {
        return '+' + changeNum
      } else {
        return changeNum
      }
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
    // 发送通知
    sendNotice(option) {
      ipcRenderer.send('window-notice', option)
    },
    // 设置更改
    changeSetting() {
      // 保存设置
      set('user', this.user)
      set('notice', this.notice)
      // 初始化数据
      this.initGithubData()
      // 更改设置状态
      this.setting = false
    },
    // 初始化数据
    initGithubData() {
      request
        .get(`/users/${this.user}`)
        .then((data) => {
          // 修改网络状态
          this.network = true

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
            request.get(`/users/${this.user}/repos?per_page=100`).then((data) => {
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
          this.network = false
        })
    },
    // 请求数据
    getGithubData() {
      request
        .get(`/users/${this.user}`)
        .then((data) => {
          // 修改网络状态
          this.network = true

          // 设置 follower 信息
          this.newFollower = data.followers

          // 统计 stat fork repo
          let fork = 0,
            star = 0,
            repoInfo = [],
            pages = Math.ceil(data.public_repos / 100)

          // 遍历 repo 信息
          while (pages--) {
            request.get(`/users/${this.user}/repos?per_page=100`).then((data) => {
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
          this.network = false
        })
    },
    // 更新 follower
    updateFollower() {
      this.follower = this.newFollower
      set('follower', this.newFollower) // 保存 follow 数据
      shell.openExternal(`https://github.com/${this.user}?tab=followers`, '_blank')
    },
    // 更新 repo
    updateRepo(repo) {
      shell.openExternal(`https://github.com/${this.user}/${repo}`, '_blank')
    },
    // 更新 star
    updateStar() {
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
    updateFork() {
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
}
</script>

<style scoped>
/* flex 竖向居中 */
.flex-col-center {
  @apply flex flex-col justify-center items-center;
}
/* flex 竖向靠左 */
.flex-col-center-left {
  @apply flex flex-col items-start;
}
/* flex 横向居中 */
.flex-row-center {
  @apply flex flex-row flex-nowrap justify-center items-center;
}
/* flex 横向靠下 */
.flex-row-center-bottom {
  @apply flex flex-row flex-nowrap items-end;
}
/* 描述 */
.text-intro {
  @apply font-mono text-sm text-gray-400;
}
</style>
