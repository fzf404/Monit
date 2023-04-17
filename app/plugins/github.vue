<!--
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-17 21:28:56
 * @Description: github 信息监控
-->

<template>
  <!-- 设置 -->
  <Setting :store="store" :setting="setting" @save="initGithubData" />
  <!-- 页面内容 -->
  <article class="grid grid-cols-12 grid-rows-5 p-4 pt-6">
    <!-- 关注数 -->
    <section class="flex-col-center col-span-7 row-span-3">
      <h1 class="font-intro mb-1">follower</h1>
      <p class="flex-row-center-bottom">
        <!-- 关注图标 -->
        <GihubSVG
          class="mb-1 mr-1 text-blue-400"
          :class="{ 'h-9': store.follower < 1000, 'h-8': store.follower > 999 }" />
        <!-- 关注数量 -->
        <span class="text-primary" :class="{ 'text-5xl': store.follower < 1000, 'text-4xl': store.follower > 999 }">
          {{ store.follower }}
        </span>
        <!-- 关注修改 -->
        <span
          class="clickable text-3xl"
          :class="{
            'text-green-400': store.follower < follower,
            'text-red-400': store.follower > follower,
            'text-secondary': store.follower === follower
          }"
          @click="updateFollower">
          {{ followerChange }}
        </span>
      </p>
    </section>
    <!-- 仓库列表 -->
    <section class="flex-col-left-scroll col-span-5 row-span-5 gap-1">
      <p v-for="item in store.repo" class="flex-row-center clickable gap-1" @click="openRepo(item.repo)">
        <!-- 仓库图标 -->
        <RepoSVG class="h-4 text-green-400" />
        <span class="text-primary text-sm">
          {{ item.star }}
        </span>
        <span class="font-intro whitespace-nowrap"> {{ item.repo }} </span>
      </p>
    </section>
    <!-- 收藏数 -->
    <section class="flex-col-center col-span-3 row-span-2">
      <h1 class="font-intro">star</h1>
      <p class="flex-row-center-bottom">
        <!-- 收藏图标 -->
        <StarSVG class="mb-1.5 mr-0.5 text-yellow-400" :class="{ 'h-5': store.star < 1000, 'h-4': store.star > 999 }" />
        <!-- 收藏数量 -->
        <span class="text-primary" :class="{ 'text-2xl': store.star < 1000, 'text-xl': store.star > 999 }">
          {{ store.star }}
        </span>
        <!-- 收藏修改 -->
        <span
          class="clickable text-xl"
          :class="{
            'text-green-400': store.star < star,
            'text-red-400': store.star > star,
            'text-secondary': store.star === star
          }"
          @click="updateStar">
          {{ starChange }}
        </span>
      </p>
    </section>
    <!-- 复刻数 -->
    <section class="flex-col-center col-span-4 row-span-2">
      <h1 class="font-intro">fork</h1>
      <p class="flex-row-center-bottom">
        <!-- 复刻图标 -->
        <ForkSVG class="mb-1 text-red-400" :class="{ 'h-6': fork < 1000, 'h-5': fork > 999 }" />
        <!-- 复刻数量 -->
        <span class="text-primary" :class="{ 'text-2xl': store.fork < 1000, 'text-xl': store.fork > 999 }">{{
          fork
        }}</span>
        <!-- 复刻修改 -->
        <span
          class="clickable text-xl"
          :class="{
            'text-green-400': store.fork < fork,
            'text-red-400': store.fork > fork,
            'text-secondary': store.fork === fork
          }"
          @click="updateFork">
          {{ forkChange }}
        </span>
      </p>
    </section>
  </article>
</template>

<script>
import { reactive } from 'vue'

import { openURL, sendAlert, sendNotice } from '~/event/send'
import axios from '~/lib/request'
import { getArrDiffKey } from '~/lib/statistic'
import { storage } from '~/lib/storage'

import { main } from '@/pinia'

import Setting from '@/components/setting.vue'
import Layout from '@/layouts/layout.vue'

import ForkSVG from '@/assets/plugin/github/fork.svg'
import GihubSVG from '@/assets/plugin/github/github.svg'
import RepoSVG from '@/assets/plugin/github/repo.svg'
import StarSVG from '@/assets/plugin/github/star.svg'

// 初始化请求
const request = axios('https://api.github.com/')

export default {
  components: {
    Layout,
    Setting,
    GihubSVG,
    StarSVG,
    ForkSVG,
    RepoSVG
  },
  setup() {
    // 存储数据
    const store = storage({
      user: '', // 用户名
      notice: false, // 允许通知

      star: 0, // 收藏数
      fork: 0, // 复刻数
      follower: 0, // 关注数

      repo: [] // 仓库列表
    })
    // 设置项
    const setting = reactive([
      {
        id: 'notice',
        label: '消息通知',
        type: 'checkbox'
      },
      {
        id: 'user',
        label: '用户名',
        type: 'text'
      }
    ])
    return { store, setting }
  },
  data() {
    // 状态数据
    return {
      follower: this.store.follower, // 当前关注数
      star: this.store.star, // 当前收藏数
      fork: this.store.fork, // 当前复刻数

      repo: this.store.repo // 当前仓库信息
    }
  },
  created() {
    if (this.store.user === '') {
      // 初始化全局状态
      const pinia = main()
      // 打开设置
      pinia.openSetting()
    } else {
      // 刷新数据
      this.getGithubData()
    }
  },
  mounted() {
    // 每隔 300秒 重新获取信息
    setInterval(() => {
      this.getGithubData()
    }, 300000)
  },
  computed: {
    // 关注数据更改
    followerChange() {
      const changeNum = this.follower - this.store.follower
      // 发送通知
      if (changeNum != 0) {
        this.store.notice && sendNotice('follower改变了！')
      }
      // 返回更改数
      if (changeNum >= 0) {
        return '+' + changeNum
      } else {
        return changeNum
      }
    },
    // 复刻数据更改
    forkChange() {
      const changeNum = this.fork - this.store.fork
      if (changeNum != 0) {
        this.store.notice && sendNotice('fork改变了！')
      }
      if (changeNum >= 0) {
        return '+' + changeNum
      } else {
        return changeNum
      }
    },
    // 收藏数据更改
    starChange() {
      const changeNum = this.star - this.store.star
      if (changeNum != 0) {
        this.store.notice && sendNotice('star改变了！')
      }
      if (changeNum >= 0) {
        return '+' + changeNum
      } else {
        return changeNum
      }
    }
  },
  methods: {
    // 初始化数据
    async initGithubData() {
      // 保存消息通知
      const notice = this.store.notice
      // 关闭消息通知
      this.store.notice = false

      // 获取用户信息
      const data = await this.getGithubData()

      // 验证用户存在
      if (!data) {
        return sendAlert('用户不存在！')
      }

      // 存储数据
      this.store.follower = this.follower
      this.store.star = this.star
      this.store.fork = this.fork
      this.store.repo = this.repo

      // 恢复消息通知
      this.store.notice = notice
    },
    // 请求数据
    async getGithubData() {
      // 获取用户信息
      const data = await request.get(`/users/${this.store.user}`)

      // 验证用户存在
      if (!data) {
        return data
      }

      // 保存关注信息
      this.follower = data.followers

      // 统计收藏、复刻、仓库数据
      let fork = 0,
        star = 0,
        repo = [],
        pages = Math.ceil(data.public_repos / 100)

      // 遍历仓库信息
      while (pages--) {
        // 读取仓库信息
        const each = await request.get(`/users/${this.store.user}/repos?page=${pages + 1}&per_page=100`)
        each.forEach((item) => {
          star += item.stargazers_count
          fork += item.forks_count
          repo.push({ repo: item.name, star: item.stargazers_count, fork: item.forks_count })
        })
      }

      // 排序
      repo.sort((a, b) => {
        return b.star - a.star
      })

      // 设置数据
      this.star = star
      this.fork = fork
      this.repo = repo

      return data
    },

    // 更新关注
    updateFollower() {
      this.store.follower = this.follower
      // 关注详细信息
      if (this.store.notice) {
        openURL(`https://github.com/${this.store.user}?tab=followers`)
      }
    },
    // 更新收藏
    updateStar() {
      if (this.store.notice) {
        // 查找收藏变化的仓库
        getArrDiffKey(this.store.repo, this.repo, 'repo', 'star').forEach((item) => {
          openURL(`https://github.com/${this.store.user}/${item.repo}/stargazers`)
        })
      }

      // 存储新数据
      this.store.star = this.star
      this.store.repo = this.repo
    },
    // 更新复刻
    updateFork() {
      if (this.store.notice) {
        // 查找复刻变化的仓库
        getArrDiffKey(this.store.repo, this.repo, 'repo', 'fork').forEach((item) => {
          openURL(`https://github.com/${this.store.user}/${item.repo}/network/members`)
        })
      }

      // 存储新数据
      this.store.fork = this.fork
      this.store.repo = this.repo
    },

    // 打开仓库
    openRepo(repo) {
      openURL(`https://github.com/${this.store.user}/${repo}`)
    }
  }
}
</script>
