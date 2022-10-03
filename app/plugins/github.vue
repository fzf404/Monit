<!--
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-10-02 22:36:45
 * @Description: github 信息监控
-->
<template>
  <!-- 设置 -->
  <Setting
    :setting="[
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
    ]"
    :config="store"
    @save="initGithubData"
  />
  <!-- 页面内容 -->
  <article class="grid grid-cols-12 grid-rows-5 p-3">
    <!-- follower -->
    <section class="flex-col-center col-span-7 row-span-3 mt-4">
      <h1 pan class="text-intro mb-1">follower</h1>
      <p class="flex-row-center-bottom">
        <!-- github svg -->
        <GihubSVG
          class="mr-1 mb-1 text-blue-400"
          :class="{ 'h-9': store.follower < 1000, 'h-8': store.follower > 999 }"
        />
        <!-- follower number -->
        <span :class="{ 'text-5xl': store.follower < 1000, 'text-4xl': store.follower > 999 }">
          {{ store.follower }}
        </span>
        <!-- follower change -->
        <span
          class="text-3xl clickable"
          :class="{
            'text-green-400': store.follower < follower,
            'text-red-400': store.follower > follower,
            'text-gray': store.follower == follower,
          }"
          @click="updateFollower"
        >
          {{ followerChange }}
        </span>
      </p>
    </section>
    <!-- repo -->
    <section class="flex-scroll col-span-5 row-span-5 mt-1">
      <p v-for="item in repoChange" class="flex-row-center space-x-1 space-y-1 clickable" @click="openRepo(item.repo)">
        <!-- repo svg -->
        <RepoSVG class="h-4 mt-1 text-green-400" />
        <span class="text-sm">
          {{ item.star }}
        </span>
        <span class="whitespace-nowrap text-intro"> {{ item.repo }} </span>
      </p>
    </section>
    <!-- star -->
    <section class="flex-col-center col-span-3 row-span-2">
      <h1 class="text-intro">star</h1>
      <p class="flex-row-center-bottom">
        <!-- star svg -->
        <StarSVG class="mr-0.5 mb-1.5 text-yellow-400" :class="{ 'h-5': store.star < 1000, 'h-4': store.star > 999 }" />
        <!-- star number -->
        <span :class="{ 'text-2xl': store.star < 1000, 'text-xl': store.star > 999 }">
          {{ store.star }}
        </span>
        <!-- star change -->
        <span
          class="text-xl clickable"
          :class="{
            'text-green-400': store.star < star,
            'text-red-400': store.star > star,
            'text-gray': store.star == star,
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
        <ForkSVG class="mb-1 text-red-400" :class="{ 'h-6': fork < 1000, 'h-5': fork > 999 }" />
        <!-- fork number -->
        <span :class="{ 'text-2xl': store.fork < 1000, 'text-xl': store.fork > 999 }">{{ fork }}</span>
        <!-- fork change -->
        <span
          class="text-xl clickable"
          :class="{
            'text-green-400': store.fork < fork,
            'text-red-400': store.fork > fork,
            'text-gray': store.fork == fork,
          }"
          @click="updateFork"
        >
          {{ forkChange }}
        </span>
      </p>
    </section>
  </article>
</template>

<script>
import { openURL, sendAlert, sendNotice } from '#/ipc'
import { useStore } from '@/store'
import axios from '~/request'
import { getArrDiffKey } from '~/statistic'
import { storage } from '~/storage'

import Setting from '@/components/setting.vue'
import Layout from '@/layouts/layout.vue'

import ForkSVG from '@/assets/github/fork.svg'
import GihubSVG from '@/assets/github/github.svg'
import RepoSVG from '@/assets/github/repo.svg'
import StarSVG from '@/assets/github/star.svg'

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
  setup() {
    // 存储数据
    const store = storage({
      user: '', // 用户名
      notice: false, // 允许通知

      star: 0, // star 数
      fork: 0, // fork 数
      follower: 0, // follower 数

      repo: [], // repo 列表
    })
    return { store }
  },
  data() {
    // 状态数据
    return {
      follower: this.store.follower, // 当前 follower 数
      star: this.store.star, // 当前 star 数
      fork: this.store.fork, // 当前 fork 数

      repo: this.store.repo, // 当前 repo 信息
    }
  },
  created() {
    // 未设置用户名
    if (this.store.user === '') {
      // 打开设置
      const store = useStore()
      store.setting.show = true
    } else {
      // 刷新数据
      this.getGithubData()
    }
  },
  mounted() {
    // 每 300s 重新获取信息
    setInterval(() => {
      this.getGithubData()
    }, 300000)
  },
  computed: {
    // follow 数据更改
    followerChange() {
      const changeNum = this.follower - this.store.follower
      // 发送通知
      if (changeNum != 0) {
        sendNotice('follower改变了！')
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
      const changeNum = this.fork - this.store.fork
      if (changeNum != 0) {
        sendNotice('fork改变了！')
      }
      if (changeNum >= 0) {
        return '+' + changeNum
      } else {
        return changeNum
      }
    },
    // star 数据更改
    starChange() {
      const changeNum = this.star - this.store.star
      if (changeNum != 0) {
        sendNotice('star改变了！')
      }
      if (changeNum >= 0) {
        return '+' + changeNum
      } else {
        return changeNum
      }
    },
    // repo 数据更改
    repoChange() {
      let repo = this.repo
      // 排序
      repo.sort((a, b) => {
        return b.star - a.star
      })
      return repo
    },
  },
  methods: {
    // 初始化数据
    async initGithubData() {
      const data = await this.getGithubData()

      // 验证用户存在
      if (data === undefined) {
        return sendAlert('用户不存在！')
      }

      this.store.follower = this.follower
      this.store.star = this.star
      this.store.fork = this.fork
      this.store.repo = this.repo
    },
    // 请求数据
    async getGithubData() {
      // 获取用户信息
      const data = await request.get(`/users/${this.store.user}`)

      // 验证用户存在
      if (data === undefined) {
        return data
      }

      // 设置 follower 信息
      this.follower = data.followers

      // 统计 stat fork repo 数据
      let fork = 0,
        star = 0,
        repo = [],
        pages = Math.ceil(data.public_repos / 100)

      // 遍历 repo 信息
      while (pages--) {
        // 读取 repo 信息
        const each = await request.get(`/users/${this.store.user}/repos?page=${pages + 1}&per_page=100`)
        each.forEach((item) => {
          star += item.stargazers_count
          fork += item.forks_count
          repo.push({ repo: item.name, star: item.stargazers_count, fork: item.forks_count })
        })
      }

      // 设置数据
      this.star = star
      this.fork = fork
      this.repo = repo

      return data
    },

    // 更新 follower
    updateFollower() {
      this.store.follower = this.follower
      openURL(`https://github.com/${this.store.user}?tab=followers`)
    },
    // 更新 star
    updateStar() {
      // 查找 star 变化的仓库
      getArrDiffKey(this.store.repo, this.repo, 'repo', 'star').forEach((item) => {
        openURL(`https://github.com/${this.store.user}/${item.repo}/stargazers`)
      })
      // 存储新数据
      this.store.star = this.star
      this.store.repo = this.repo
    },
    // 更新 fork
    updateFork() {
      // 查找 star 变化的仓库
      getArrDiffKey(this.store.repo, this.repo, 'repo', 'fork').forEach((item) => {
        openURL(`https://github.com/${this.store.user}/${item.repo}/network/members`)
      })
      // 存储新数据
      this.store.fork = this.fork
      this.store.repo = this.repo
    },

    // 打开 repo
    openRepo(repo) {
      openURL(`https://github.com/${this.store.user}/${repo}`)
    },
  },
}
</script>
