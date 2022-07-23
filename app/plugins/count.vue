<!--
 * @Author: fzf404
 * @Date: 2022-07-15 22:03:19
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-23 23:18:13
 * @Description: count 计数器
-->
<template>
  <main>
    <!-- 窗口控制器 -->
    <Layout />
    <!-- 页面内容 -->
    <article class="h-screen">
      <!-- 设置 -->
      <Setting size="small" />
      <!-- 主体 -->
      <section class="h-full flex-col-center space-y-2">
        <h1 class="text-intro">计数器</h1>
        <p class="text-5xl">{{ store.config.count }}</p>
        <!-- 增加 & 减少 -->
        <p class="space-x-4 pt-2">
          <button class="btn btn-sq bg-red-500 hover:bg-red-600" @click="reduce"><SubSVG class="w-5" /></button>
          <button class="btn btn-sq bg-green-500 hover:bg-green-600" @click="increase"><AddSVG class="w-5" /></button>
        </p>
      </section>
    </article>
  </main>
</template>

<script>
import { useMainStore } from '#/store'
import { storage } from '~/storage'

import Setting from '@/layouts/setting.vue'

import AddSVG from '@/assets/count/add.svg'
import SubSVG from '@/assets/count/sub.svg'
import Layout from '@/layouts/macto.vue'

export default {
  setup() {
    // 初始化 store
    const store = useMainStore()
    // 初始化 storage
    const { get } = storage()

    // 配置项
    store.config = {
      // 读取 count 值
      count: get('count', 0), // 数值
      // 读取 setp 值
      step: get('step', 1), // 步长
    }

    // 设置菜单
    store.settingList = [
      {
        id: 'count',
        title: '数值',
        type: 'number',
      },
      {
        id: 'step',
        title: '步长',
        type: 'number',
      },
    ]

    return { store }
  },
  components: {
    Layout,
    AddSVG,
    SubSVG,
    Setting,
  },
  methods: {
    increase() {
      // 浮点数运算精度
      this.store.config.count = Number((this.store.config.count + this.store.config.step).toFixed(2))
    },
    reduce() {
      // 浮点数运算精度
      this.store.config.count = Number((this.store.config.count - this.store.config.step).toFixed(2))
    },
  },
}
</script>
