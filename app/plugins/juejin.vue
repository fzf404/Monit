<!--
 * @Author: Ned
 * @Date: 2022-08-14 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-22 21:06:40
 * @Description: juejin 信息监控
-->
<template>
  <!-- 设置 -->
  <Setting :setting="setting" :config="config" @save="initJuejinData" />
  <!-- 页面内容 -->
  <article class="grid grid-cols-7 grid-rows-6 p-3 pb-4">
    <!-- 关注者 -->
    <section class="flex-col-center col-start-1 col-end-3 row-start-2">
      <h1 class="text-intro">关注者</h1>
      <p class="flex-row-center-bottom">
        <!-- 关注者 svg -->
        <FollowerSVG
          class="mr-1 mb-1 stroke-current text-violet-500"
          :class="{ 'h-5': follower < 1000, 'h-4': follower > 999 }"
        />
        <!-- 关注者 number -->
        <span :class="{ 'text-2xl': follower < 1000, 'text-xl': follower > 999 }">
          {{ follower }}
        </span>
        <!-- 关注者 change -->
        <span
          class="text-xl clickable"
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
    <!-- 掘力值 -->
    <section class="flex-col-center col-start-2 col-end-5 row-start-3">
      <h1 class="text-intro">掘力值</h1>
      <p class="flex-row-center-bottom">
        <!-- 掘力 svg -->
        <PowerSVG class="mr-1 mb-1 stroke-current text-blue-400" :class="{ 'h-5': power < 1000, 'h-4': power > 999 }" />
        <!-- 掘力 number -->
        <span :class="{ 'text-2xl': power < 1000, 'text-xl': power > 999 }">
          {{ power >= 1000 ? `${(power / 1000).toFixed(2)}k` : power }}
        </span>
        <!-- 掘力 change -->
        <span
          class="text-xl clickable"
          :class="{
            'text-green-400': power < newPower,
            'text-red-400': power > newPower,
            'text-gray': power == newPower,
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
        <!-- 点赞 svg -->
        <LikeSVG
          class="mr-0.5 mb-1.5 stroke-current text-yellow-400"
          :class="{ 'h-5': like < 1000, 'h-4': like > 999 }"
        />
        <!-- 点赞数 number -->
        <span :class="{ 'text-2xl': like < 1000, 'text-xl': like > 999 }">
          {{ like >= 1000 ? `${(like / 1000).toFixed(2)}k` : like }}
        </span>
        <!-- 点赞数 change -->
        <span
          class="text-xl clickable"
          :class="{
            'text-green-400': like < newLike,
            'text-red-400': like > newLike,
            'text-gray': like == newLike,
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
        <!-- 阅读 svg -->
        <ViewSVG class="mr-1 mb-1 stroke-current text-red-400" :class="{ 'h-5': view < 1000, 'h-4': view > 999 }" />
        <!-- 阅读 number -->
        <span :class="{ 'text-2xl': view < 1000, 'text-xl': view > 999 }">{{
          view >= 10000 ? `${(view / 1000).toFixed(2)}k` : view
        }}</span>
        <!-- 阅读 change -->
        <span
          class="text-xl clickable"
          :class="{
            'text-green-400': view < newView,
            'text-red-400': view > newView,
            'text-gray': view == newView,
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
        <!-- 掘金 svg -->
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
        <!-- article svg -->
        <ArticleSVG class="h-4 mt-3 stroke-current text-blue-400" />
        <span class="whitespace-nowrap text-intro">
          {{ item.title }}
        </span>
      </p>
    </section>
  </article>
</template>

<script>
import { openURL, sendNotice } from '#/ipc'

import Setting from '@/components/setting.vue'
import Layout from '@/layouts/layout.vue'

import { useStore } from '@/store'
import axios from '~/request'
import { storage } from '~/storage'

import ArticleSVG from '@/assets/juejin/article.svg'
import FollowerSVG from '@/assets/juejin/follower.svg'
import JuejinSVG from '@/assets/juejin/juejin.svg'
import LikeSVG from '@/assets/juejin/like.svg'
import PowerSVG from '@/assets/juejin/power.svg'
import ViewSVG from '@/assets/juejin/view.svg'

// 初始化 storage
const { set, get } = storage()

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
    return { store: useStore() }
  },
  data() {
    return {
      // 配置数据
      config: {
        notice: false, // 开启提醒
        user: '', // 用户名
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
          label: '用户ID',
          type: 'text',
        },
      ],
      // 用户名
      name: '',

      // 状态数据
      follower: get('follower', 0), // 关注 数
      newFollower: get('follower', 0), // 新 关注 数

      like: get('like', 0), // 点赞 数
      newLike: get('like', 0), // 新 点赞 数

      view: get('view', 0), // 阅读 数
      newView: get('view', 0), // 新 阅读 数

      power: get('power', 0), // 掘力值 信息
      newPower: get('power', 0), // 新 掘力值 信息

      articleInfo: get('article', []), // article 信息
      newArticleInfo: get('article', []), // 新 article 信息
    }
  },
  // 监听数据
  watch: {
    follower(value) {
      set('follower', value)
    },
    like(value) {
      set('like', value)
    },
    view(value) {
      set('view', value)
    },
    power(value) {
      set('power', value)
    },
    articleInfo(value) {
      set('article', value)
    },
  },
  created() {
    if (this.config.user === '') {
      // 打开设置
      this.store.setting.show = true
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
      const changeNum = this.newFollower - this.follower
      // 发送通知
      if (changeNum != 0) {
        sendNotice('关注数 改变了！')
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
      const changeNum = this.newLike - this.like
      // 发送通知
      if (changeNum != 0) {
        sendNotice('点赞数 改变了！')
      }
      if (changeNum >= 0) {
        return '+' + changeNum
      } else {
        return changeNum
      }
    },
    // 阅读 数据更改
    viewChange() {
      const changeNum = this.newView - this.view
      if (changeNum >= 0) {
        return '+' + changeNum
      } else {
        return changeNum
      }
    },
    // 掘力值 数据更改
    powerChange() {
      const changeNum = this.newPower - this.power
      // 发送通知
      if (changeNum != 0) {
        sendNotice('掘力值 改变了！')
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
      const articleInfo = this.articleInfo
      return articleInfo
    },
  },
  methods: {
    //  初始化数据函数
    async initJuejinData() {
      await this.getJuejinData()
      this.follower = this.newFollower
      this.like = this.newLike
      this.view = this.newView
      this.power = this.newPower
      this.articleInfo = this.newArticleInfo
    },
    // 请求数据
    async getJuejinData() {
      const { data } = await request.get(`user_api/v1/user/get?user_id=${this.config.user}`)
      if (data.user_id === '0') {
        return alert('用户ID错误！')
      }
      this.name = data.user_name
      this.newFollower = data.follower_count
      this.newLike = data.got_digg_count
      this.newView = data.got_view_count
      this.newPower = data.power
      const { data: list } = await request.post(`content_api/v1/article/query_list`, {
        cursor: '0',
        sort_type: 2,
        user_id: this.config.user,
      })
      let articleInfo = []
      list.forEach((e) => {
        articleInfo.push({ title: e.article_info.title, id: e.article_id })
      })
      this.newArticleInfo = articleInfo
    },
    // 更新 关注
    updateFollower() {
      this.follower = this.newFollower
    },
    // 更新 点赞
    updatelike() {
      this.like = this.newLike
    },
    // 更新 阅读
    updateView() {
      this.view = this.newView
    },
    // 更新 掘力值
    updatePower() {
      this.power = this.newPower
    },
    // 打开 article
    openArticle(id) {
      openURL(`https://juejin.cn/post/${id}`)
    },
  },
}
</script>
