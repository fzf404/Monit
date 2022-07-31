<!--
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-31 23:54:59
 * @Description: github 信息监控
-->
<template>
  <main>
    <!-- 窗口控制器 -->
    <Layout />
    <!-- 设置 -->
    <Setting :setting="setting" :config="config" @save="onSave" />
    <!-- 页面内容 -->
    <article class="h-screen grid grid-cols-12 grid-rows-5 p-3">
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
              'text-gray': follower == newFollower,
            }"
            @click="updateFollower"
          >
            {{ followerChange }}
          </span>
        </p>
      </section>
      <!-- repo -->
      <section class="flex-col-center-left col-span-5 row-span-5 overflow-y-scroll mt-px">
        <p
          v-for="value in repoChange"
          class="flex-row-center space-x-1 space-y-1 clickable"
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
                ? value.repo.length > 11
                  ? value.repo.slice(0, 9) + '..'
                  : value.repo
                : value.repo.length > 12
                ? value.repo.slice(0, 10) + '..'
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
              'text-gray': star == newStar,
            }"
            @click="updateStar"
          >
            {{ starChange }}
          </span>
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
              'text-gray': fork == newFork,
            }"
            @click="updateFork"
          >
            {{ forkChange }}
          </span>
        </p>
      </section>
    </article>
  </main>
</template>

<script>
import { shell } from 'electron'

import { sendNotice } from '#/ipc'
import axios from '~/request'
import { getArrDiffKey } from '~/statistic'
import { storage } from '~/storage'

import Layout from '@/layouts/maco.vue'

import ForkSVG from '@/assets/github/fork.svg'
import GihubSVG from '@/assets/github/github.svg'
import RepoSVG from '@/assets/github/repo.svg'
import StarSVG from '@/assets/github/star.svg'
import Setting from '@/layouts/setting.vue'

// 初始化 storage
const { set, get } = storage('github')

// 初始化 axios
const request = axios('https://api.github.com')

export default {
  components: {
    Layout,
    GihubSVG,
    StarSVG,
    ForkSVG,
    RepoSVG,
    Setting,
  },
  data() {
    return {
      // 配置数据
      config: {
        notice: get('notice', false), // 开启提醒
        user: get('user', ''), // 用户名
      },
      // 设置菜单
      setting: [
        {
          id: 'notice',
          label: '消息通知',
          type: 'checkbox',
        },
        {
          id: 'user',
          label: '用户名',
          type: 'text',
        },
      ],
      // 状态数据
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
  // 监听设置更改
  watch: {
    follower(value) {
      set('follower', value)
    },
    star(value) {
      set('star', value)
    },
    fork(value) {
      set('fork', value)
    },
    repoInfo(value) {
      set('repo', value)
    },
  },
  created() {
    if (this.config.user === '') {
      // 打开设置
      this.store.setting = true
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
        sendNotice('follower is changed')
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
        sendNotice('fork is changed')
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
        sendNotice('star is changed')
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
    // 设置更改
    onSave() {
      // 初始化数据
      this.initGithubData()
    },
    // 初始化数据
    async initGithubData() {
      await this.getGithubData()
      this.follower = this.newFollower
      this.star = this.newStar
      this.fork = this.newFork
      this.repoInfo = this.newRepoInfo
    },
    // 请求数据
    async getGithubData() {
      await request.get(`/users/${this.config.user}`).then(async (data) => {
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
          await request.get(`/users/${this.config.user}/repos?page=${pages + 1}&per_page=100`).then((data) => {
            // 遍历数据
            data.forEach((item) => {
              star += item.stargazers_count
              fork += item.forks_count
              repoInfo.push({ repo: item.name, star: item.stargazers_count, fork: item.forks_count })
            })
          })
        }

        // 设置数据
        this.newStar = star
        this.newFork = fork
        this.newRepoInfo = repoInfo
      })
    },
    // 更新 follower
    updateFollower() {
      this.follower = this.newFollower
      shell.openExternal(`https://github.com/${this.config.user}?tab=followers`, '_blank')
    },
    // 更新 repo
    updateRepo(repo) {
      shell.openExternal(`https://github.com/${this.config.user}/${repo}`, '_blank')
    },
    // 更新 star
    updateStar() {
      this.star = this.newStar
      // 查找 star 变化的仓库
      getArrDiffKey(this.repoInfo, this.newRepoInfo, 'star').forEach((item) => {
        // 访问
        shell.openExternal(`https://github.com/${this.config.user}/${item.repo}/stargazers`, '_blank')
      })
      // 更新 repo
      this.repoInfo = this.newRepoInfo
    },
    // 更新 fork
    updateFork() {
      this.fork = this.newFork
      // 查找 star 变化的仓库
      getArrDiffKey(this.repoInfo, this.newRepoInfo, 'fork').forEach((item) => {
        // 访问
        shell.openExternal(`https://github.com/${this.config.user}/${item.repo}/network/members`, '_blank')
      })
      // 更新 repo
      this.repoInfo = this.newRepoInfo
    },
  },
}
</script>
