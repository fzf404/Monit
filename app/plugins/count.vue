<!--
 * @Author: fzf404
 * @Date: 2022-07-15 22:03:19
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-08-12 19:35:20
 * @Description: count 计数器
-->
<template>
  <main>
    <!-- 设置 -->
    <Setting size="small" :setting="setting" :config="config" />
    <!-- 页面内容 -->
    <article class="h-screen">
      <!-- 主体 -->
      <section class="h-full flex-col-center space-y-2">
        <h1 class="text-intro">计数器</h1>
        <p class="text-5xl">{{ config.count }}</p>
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
import AddSVG from '@/assets/count/add.svg'
import SubSVG from '@/assets/count/sub.svg'
import Setting from '@/components/setting.vue'

import { reactive } from 'vue'
import { storage } from '~/storage'

export default {
  setup() {
    // 初始化 storage
    const { get } = storage()

    // 配置项
    const config = reactive({
      // 读取 count 值
      count: get('count', 0), // 数值
      // 读取 setp 值
      step: get('step', 1), // 步长
    })

    // 设置信息
    const setting = [
      {
        id: 'count',
        label: '数值',
        type: 'number',
        options: {
          len: 5,
        },
      },
      {
        id: 'step',
        label: '步长',
        type: 'number',
        options: {
          len: 3,
        },
      },
    ]

    return { setting, config }
  },
  components: {
    AddSVG,
    SubSVG,
    Setting,
  },
  methods: {
    increase() {
      // 浮点数运算精度
      this.config.count = Number((this.config.count + this.config.step).toFixed(2))
    },
    reduce() {
      // 浮点数运算精度
      this.config.count = Number((this.config.count - this.config.step).toFixed(2))
    },
  },
}
</script>
