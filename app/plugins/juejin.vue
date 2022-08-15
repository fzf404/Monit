<!--
 * @Author: Ned
 * @Date: 2022-08-14 23:18:50
 * @LastEditors: Ned 15041567431@126.com
 * @LastEditTime: 2022-08-15 14:18:50
 * @Description: juejin 信息监控
-->
<template>
  <main>
    <!-- 窗口控制器 -->
    <Layout />
    <!-- 设置 -->
    <Setting :setting="setting" :config="config" @save="onSave" />
    <!-- 页面内容 -->
    <article class="h-screen grid grid-cols-12 grid-rows-6 p-3">
      <!-- follower -->
      <section class="flex-col-center col-start-1 col-end-4 row-start-2 row-end-3">
        <h1 pan class="text-intro">关注者</h1>
        <p class="flex-row-center-bottom">
          <!-- follower svg -->
          <FollowerSVG
            class="mr-1 mb-1 stroke-current text-violet-500"
            :class="{ 'h-5': follower < 1000, 'h-4': follower > 999 }"
          />
          <!-- follower number -->
          <span :class="{ 'text-2xl': follower < 1000, 'text-xl': follower > 999 }">
            {{ follower }}
          </span>
          <!-- follower change -->
          <span
            class="text-xl clickable"
            :class="{
              'text-green-400': follower < newFollower_count,
              'text-red-400': follower > newFollower_count,
              'text-gray': follower == newFollower_count,
            }"
            @click="updateFollower"
          >
            {{ followerChange }}
          </span>
        </p>
      </section>
      <!-- power -->
      <section class="flex-col-center col-start-2 col-end-7 row-start-3">
        <h1 pan class="text-intro">掘力值</h1>
        <p class="flex-row-center-bottom">
          <!-- power svg -->
          <PowerSVG
            class="mr-1 mb-1 stroke-current text-blue-400"
            :class="{ 'h-5': power < 1000, 'h-4': power > 999 }"
          />
          <!-- power number -->
          <span :class="{ 'text-2xl': power < 1000, 'text-xl': power > 999 }">
            {{ power >= 1000 ? `${(power / 1000).toFixed(2)}k` : power }}
          </span>
        </p>
      </section>
      <!-- article -->
      <section class="flex-col-center-left col-start-7 col-end-13 row-span-6 pt-6 overflow-y-scroll mt-px">
        <p
          v-for="item in articleChange"
          class="flex-row-center space-x-1 space-y-3 clickable"
          @click="openArticle(item.id)"
        >
          <!-- article svg -->
          <ArticleSVG class="h-4 mt-3 stroke-current text-blue-400" />
          <span class="text-intro">
            {{ item.title.length > 11 ? item.title.slice(0, 9) + '..' : item.title }}
          </span>
        </p>
      </section>
      <!-- digg -->
      <section class="flex-col-center col-start-1 col-end-4 row-start-4">
        <h1 class="text-intro">获赞数</h1>
        <p class="flex-row-center-bottom">
          <!-- digg svg -->
          <LikeSVG
            class="mr-0.5 mb-1.5 stroke-current text-yellow-400"
            :class="{ 'h-5': digg < 1000, 'h-4': digg > 999 }"
          />
          <!-- digg number -->
          <span :class="{ 'text-2xl': digg < 1000, 'text-xl': digg > 999 }">
            {{ digg >= 1000 ? `${(digg / 1000).toFixed(2)}k` : digg }}
          </span>
          <!-- digg change -->
          <span
            class="text-xl clickable"
            :class="{
              'text-green-400': digg < got_new_digg_count,
              'text-red-400': digg > got_new_digg_count,
              'text-gray': digg == got_new_digg_count,
            }"
            @click="updateDigg"
          >
            {{ diggChange }}
          </span>
        </p>
      </section>
      <!-- view -->
      <section class="flex-col-center col-start-2 col-end-7 row-start-5">
        <h1 class="text-intro">阅读数</h1>
        <p class="flex-row-center-bottom">
          <!-- fork svg -->
          <ViewSVG class="mb-1 stroke-current text-red-400" :class="{ 'h-6': view < 1000, 'h-5': view > 999 }" />
          <!-- fork number -->
          <span :class="{ 'text-2xl': view < 1000, 'text-xl': view > 999 }">{{
            view >= 10000 ? `${(view / 1000).toFixed(2)}k` : view
          }}</span>
          <!-- fork change -->
          <span
            class="text-xl clickable"
            :class="{
              'text-green-400': view < got_new_view_count,
              'text-red-400': view > got_new_view_count,
              'text-gray': view == got_new_view_count,
            }"
            @click="updateView"
          >
            {{ viewChange }}
          </span>
        </p>
      </section>
      <section class="flex-col-center col-start-1 col-end-7 row-start-6">
        <p class="flex-row-center-bottom">
          <span class="text-intro">
            {{ `当前：${name.length > 9 ? name.slice(0, 5) + '..' : name}` }}
          </span>
          <JuejinSVG class="h-5 pl-1 mt-0 stroke-current text-blue-400" />
        </p>
      </section>
    </article>
  </main>
</template>

<!-- TODO 插件 juejin -->
<script>
import { openURL, sendNotice } from '#/ipc'

import Layout from '@/layouts/layout.vue'
import Setting from '@/components/setting.vue'

import axios from '~/request'
import { useStore } from '@/store'
import { storage } from '~/storage'

import ArticleSVG from '@/assets/juejin/article.svg'
import JuejinSVG from '@/assets/juejin/juejin.svg'
import PowerSVG from '@/assets/juejin/power.svg'
import LikeSVG from '@/assets/juejin/like.svg'
import ViewSVG from '@/assets/juejin/view.svg'
import FollowerSVG from '@/assets/juejin/follower.svg'
// 初始化 storage
const { set, get } = storage('juejin')

// 初始化 axios
const juejinurl = 'https://api.juejin.cn/'
const request = axios(juejinurl)

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
        notice: get('notice', false), // 开启提醒
        userId: get('userId', ''), // 用户名
      },
      // 设置菜单
      setting: [
        {
          id: 'notice',
          label: '消息通知',
          type: 'checkbox',
        },
        {
          id: 'userId',
          label: '用户ID',
          type: 'text',
        },
      ],
      // 当前用户名
      name: '',
      // 状态数据
      follower: get('follower', 0), // 关注 数
      newFollower_count: get('follower', 0), // 新 关注 数

      digg: get('digg', 0), // 点赞 数
      got_new_digg_count: get('digg', 0), // 新 点赞 数

      view: get('view', 0), // 阅读 数
      got_new_view_count: get('view', 0), // 新 阅读 数

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
    digg(value) {
      set('digg', value)
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
    if (this.config.userId === '') {
      // 打开设置
      this.store.setting.show = true
    } else {
      // 刷新数据
      this.getJuejinData()
    }
  },
  mounted() {
    // 每 60s 重新获取信息
    setInterval(() => {
      this.getJuejinData()
    }, 60000)
  },
  computed: {
    // 关注数据更改
    followerChange() {
      const changeNum = this.newFollower_count - this.follower
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
    diggChange() {
      const changeNum = this.got_new_digg_count - this.digg
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
      const changeNum = this.got_new_view_count - this.view
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
      const articleInfo = this.articleInfo
      // 排序(后续ing  =、=)
      return articleInfo
    },
  },
  methods: {
    onSave() {
      // 初始化数据
      this.initJuejinData()
    },
    //  初始化数据函数
    async initJuejinData() {
      await this.getJuejinData()
      this.follower = this.newFollower_count
      this.digg = this.got_new_digg_count
      this.view = this.got_new_view_count
      this.power = this.newPower
      this.articleInfo = this.newArticleInfo
    },
    // 请求数据
    async getJuejinData() {
      const { data } = await request.get(`user_api/v1/user/get?user_id=${this.config.userId}`)
      // 修改网络状态
      this.network = true
      //   // 设置数据
      this.name = data.user_name
      this.newFollower_count = data.follower_count
      this.got_new_digg_count = data.got_digg_count
      this.got_new_view_count = data.got_view_count
      this.newPower = data.power
      const { data: list } = await request.post(`content_api/v1/article/query_list`, {
        cursor: '0',
        sort_type: 2,
        user_id: this.config.userId,
      })
      let articleInfo = []
      list.forEach((e) => {
        articleInfo.push({ title: e.article_info.title, id: e.article_id })
      })
      this.newArticleInfo = articleInfo
    },
    // 更新 关注
    updateFollower() {
      this.follower = this.newFollower_count
    },
    // 更新 点赞
    updateDigg() {
      this.digg = this.got_new_digg_count
    },
    // 更新 阅读
    updateView() {
      this.view = this.got_new_view_count
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
