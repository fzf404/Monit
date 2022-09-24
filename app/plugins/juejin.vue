<!--
 * @Author: Ned
 * @Date: 2022-08-14 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-24 23:39:09
 * @Description: juejin 信息监控
-->
<template>
  <!-- 设置 -->
  <Setting
    :show="true"
    :setting="[
      {
        id: 'notice',
        label: '消息通知',
        type: 'checkbox',
      },
      {
        id: 'user',
        label: '用户ID',
        type: 'text',
      },
    ]"
    :config="store"
    @save="initJuejinData"
  />
  <!-- 页面内容 -->
  <article class="grid grid-cols-7 grid-rows-6 p-3 pb-4">
    <!-- 关注者 -->
    <section class="flex-col-center col-start-1 col-end-3 row-start-2">
      <h1 class="text-intro">关注者</h1>
      <p class="flex-row-center-bottom">
        <!-- 关注者图标 -->
        <FollowerSVG
          class="mr-1 mb-1 stroke-current text-violet-500"
          :class="{ 'h-5': store.follower < 1000, 'h-4': store.follower > 999 }"
        />
        <!-- 关注者 number -->
        <span :class="{ 'text-2xl': store.follower < 1000, 'text-xl': store.follower > 999 }">
          {{ store.follower }}
        </span>
        <!-- 关注者修改 -->
        <span
          class="text-xl clickable"
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
    <!-- 掘力值 -->
    <section class="flex-col-center col-start-2 col-end-5 row-start-3 scrollable">
      <h1 class="text-intro">掘力值</h1>
      <p class="flex-row-center-bottom">
        <!-- 掘力值图标 -->
        <PowerSVG
          class="mr-1 mb-1 stroke-current text-blue-400"
          :class="{ 'h-5': store.power < 1000, 'h-4': store.power > 999 }"
        />
        <!-- 掘力值 number -->
        <span :class="{ 'text-2xl': store.power < 1000, 'text-xl': store.power > 999 }">
          {{ store.power >= 1000 ? `${(store.power / 1000).toFixed(2)}k` : store.power }}
        </span>
        <!-- 掘力值修改 -->
        <span
          class="text-xl clickable"
          :class="{
            'text-green-400': store.power < power,
            'text-red-400': store.power > power,
            'text-gray': store.power == power,
          }"
          @click="updatePower"
        >
          {{ powerChange }}
        </span>
      </p>
    </section>
    <!-- 点赞数 -->
    <section class="flex-col-center col-start-1 col-end-3 row-start-4">
      <h1 class="text-intro">获赞数</h1>
      <p class="flex-row-center-bottom">
        <!-- 点赞图标 -->
        <LikeSVG
          class="mr-0.5 mb-1.5 stroke-current text-yellow-400"
          :class="{ 'h-5': store.like < 1000, 'h-4': store.like > 999 }"
        />
        <!-- 点赞数 number -->
        <span :class="{ 'text-2xl': store.like < 1000, 'text-xl': store.like > 999 }">
          {{ store.like >= 1000 ? `${(store.like / 1000).toFixed(2)}k` : store.like }}
        </span>
        <!-- 点赞数修改 -->
        <span
          class="text-xl clickable"
          :class="{
            'text-green-400': store.like < like,
            'text-red-400': store.like > like,
            'text-gray': store.like == like,
          }"
          @click="updatelike"
        >
          {{ likeChange }}
        </span>
      </p>
    </section>
    <!-- 阅读数 -->
    <section class="flex-col-center col-start-2 col-end-5 row-start-5">
      <h1 class="text-intro">阅读数</h1>
      <p class="flex-row-center-bottom">
        <!-- 阅读数图标 -->
        <ViewSVG
          class="mr-1 mb-1 stroke-current text-red-400"
          :class="{ 'h-5': store.view < 1000, 'h-4': store.view > 999 }"
        />
        <!-- 阅读数 -->
        <span :class="{ 'text-2xl': store.view < 1000, 'text-xl': store.view > 999 }">{{
          store.view >= 10000 ? `${(store.view / 1000).toFixed(2)}k` : store.view
        }}</span>
        <!-- 阅读数修改 -->
        <span
          class="text-xl clickable"
          :class="{
            'text-green-400': store.view < view,
            'text-red-400': store.view > view,
            'text-gray': store.view == view,
          }"
          @click="updateView"
        >
          {{ viewChange }}
        </span>
      </p>
    </section>
    <!-- 用户名 -->
    <section class="flex-col-center-end col-start-1 col-end-5 row-start-6">
      <p class="flex-row-center-bottom">
        <!-- 掘金图标 -->
        <JuejinSVG class="h-5 pr-1" />
        <span class="text-intro">
          {{ `${name.length > 9 ? name.slice(0, 7) + '..' : name}` }}
        </span>
      </p>
    </section>
    <!-- 文章 -->
    <section class="flex-col-left col-start-5 col-end-8 row-start-1 row-end-7 overflow-y-scroll mt-1">
      <p
        v-for="item in articleChange"
        class="flex-row-center space-x-1 space-y-3 clickable"
        @click="openArticle(item.id)"
      >
        <!-- 文章图标 -->
        <ArticleSVG class="h-4 mt-3 stroke-current text-blue-400" />
        <!-- 文章名 -->
        <span class="whitespace-nowrap text-intro">
          {{ item.title }}
        </span>
      </p>
    </section>
  </article>
</template>

<script>
import { openURL, sendAlert, sendNotice } from '#/ipc'

import { useStore } from '@/store'
import axios from '~/request'
import { storage } from '~/storage'

import Setting from '@/components/setting.vue'
import Layout from '@/layouts/layout.vue'

import ArticleSVG from '@/assets/juejin/article.svg'
import FollowerSVG from '@/assets/juejin/follower.svg'
import JuejinSVG from '@/assets/juejin/juejin.svg'
import LikeSVG from '@/assets/juejin/like.svg'
import PowerSVG from '@/assets/juejin/power.svg'
import ViewSVG from '@/assets/juejin/view.svg'

// 初始化 axios
const request = axios('https://api.juejin.cn/')

export default {
  components: {
    Layout,
    ArticleSVG,
    JuejinSVG,
    PowerSVG,
    FollowerSVG,
    ViewSVG,
    LikeSVG,
    Setting,
  },
  setup() {
    // 存储数据
    const store = storage({
      user: '', // 用户ID
      notice: false, // 允许通知

      like: 0, // 点赞数
      view: 0, // 阅读数
      power: 0, // 掘力值
      follower: 0, // 关注数

      article: [], // 文章列表
    })
    return { store }
  },
  data() {
    // 状态数据
    return {
      name: '', // 当前用户名

      follower: this.store.follower, // 当前关注数

      like: this.store.like, // 当前点赞数
      view: this.store.view, // 当前阅读数
      power: this.store.power, // 当前掘力值

      article: this.store.article, // 当前文章信息
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
      this.getJuejinData()
    }
  },
  mounted() {
    // 每 300s 重新获取信息
    setInterval(() => {
      this.getJuejinData()
    }, 300000)
  },
  computed: {
    // 关注数据更改
    followerChange() {
      const changeNum = this.follower - this.store.follower
      // 发送通知
      if (changeNum != 0) {
        sendNotice('关注数改变了！')
      }
      // 返回更改数
      if (changeNum >= 0) {
        return '+' + changeNum
      } else {
        return changeNum
      }
    },
    // 点赞 数据更改
    likeChange() {
      const changeNum = this.like - this.store.like
      // 发送通知
      if (changeNum != 0) {
        sendNotice('点赞数改变了！')
      }
      if (changeNum >= 0) {
        return '+' + changeNum
      } else {
        return changeNum
      }
    },
    // 阅读 数据更改
    viewChange() {
      const changeNum = this.view - this.store.view
      if (changeNum >= 0) {
        return '+' + changeNum
      } else {
        return changeNum
      }
    },
    // 掘力值 数据更改
    powerChange() {
      const changeNum = this.power - this.store.power
      // 发送通知
      if (changeNum != 0) {
        sendNotice('掘力值改变了！')
      }
      if (changeNum >= 0) {
        return '+' + changeNum
      } else {
        return changeNum
      }
    },
    // article 数据更改
    articleChange() {
      // TODO 排序
      const article = this.article
      return article
    },
  },
  methods: {
    //  初始化数据函数
    async initJuejinData() {
      await this.getJuejinData()

      this.store.follower = this.follower
      this.store.like = this.like
      this.store.view = this.view
      this.store.power = this.power
      this.article = this.article
    },
    // 请求数据
    async getJuejinData() {
      // 获取用户信息
      const { data } = await request.get(`user_api/v1/user/get?user_id=${this.store.user}`)
      // 验证用户存在
      if (data.user_id === '0') {
        return sendAlert('用户ID错误！')
      }

      // 设置信息
      this.name = data.user_name
      this.follower = data.follower_count
      this.like = data.got_digg_count
      this.view = data.got_view_count
      this.power = data.power

      // 获取文章信息
      const { data: list } = await request.post(`content_api/v1/article/query_list`, {
        cursor: '0',
        sort_type: 2,
        user_id: this.store.user,
      })

      // 处理文章信息
      const info = list.map((item) => {
        return { title: item.article_info.title, id: item.article_id }
      })

      this.article = info
    },
    // 更新关注数
    updateFollower() {
      this.store.follower = this.follower
    },
    // 更新点赞数
    updatelike() {
      this.store.like = this.like
    },
    // 更新阅读数
    updateView() {
      this.store.view = this.view
    },
    // 更新掘力值
    updatePower() {
      this.store.power = this.power
    },
    // 打开文章
    openArticle(id) {
      openURL(`https://juejin.cn/post/${id}`)
    },
  },
}
</script>
