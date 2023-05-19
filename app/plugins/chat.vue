<!--
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-17 23:47:09
 * @Description: chat 问答机器人
-->

<template>
  <!-- 设置-->
  <Setting :store="store" :setting="setting" />
  <!-- 页面内容 -->
  <article class="flex-col-between p-4 pt-8">
    <li class="scrollable flex-row-between" v-for="item in store.chat">
      <p>
        <span class="text-secondary">{{ item.role }}：</span>
        <span class="text-primary">{{ item.content }}</span>
      </p>
    </li>
    <li class="flex-row-between border-theme border-t-2 pt-2">
      <input v-model="state.message" @keyup.enter="sendMessage()" type="text" />
    </li>
  </article>
</template>

<!-- TODO 插件 chat -->
<script setup lang="ts">
import { onMounted, reactive } from 'vue'

import axios from '~/lib/request'
import { storage } from '~/lib/storage'

import Setting from '@/components/setting.vue'

const state = reactive({
  // 加载状态
  loading: false,
  // 信息内容
  message: ''
})

// 存储数据
const store = storage(
  {
    key: '',
    url: 'https://api.fzf404.art/chat',
    chat: [{ role: 'assistant', content: '你好，我是ChatGPT，需要帮助吗？' }]
  },
  {
    // 接口地址修改
    url: () => {
      location.reload()
    }
  }
)

const setting = reactive([
  {
    id: 'url',
    label: '请求地址',
    type: 'text',
    help: 'https://monit.fzf404.art/#/zh/01-guide?id=🎵-music-音乐'
  },
  {
    id: 'key',
    label: 'APIKEY',
    type: 'text',
    help: 'https://monit.fzf404.art/#/zh/01-guide?id=🎵-music-音乐'
  }
])

// 初始化请求
const request = axios(store.url)

// 发送消息
const sendMessage = async () => {
  // 判断等待状态
  if (state.loading) return
  // 验证消息存在
  if (state.message.length === 0) return

  // 等待中
  state.loading = true

  // 写入聊天内容
  store.chat.push({ role: 'user', content: state.message })
  state.message = ''

  // 设置请求头
  request.defaults.headers.post['Content-Type'] = 'application/json'
  request.defaults.headers.common['Authorization'] = `Bearer ${store.key}`

  // 发送请求
  const data = await request.post('/v1/chat/completions', {
    temperature: 0.6,
    messages: store.chat,
    model: 'gpt-3.5-turbo'
  })

  console.log('data', data)
}

onMounted(() => {
  sendMessage()
})
</script>
