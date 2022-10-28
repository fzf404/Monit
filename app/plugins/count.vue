<!--
 * @Author: fzf404
 * @Date: 2022-07-15 22:03:19
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-10-02 22:22:01
 * @Description: count 计数器
-->
<template>
  <!-- 设置 -->
  <Setting
    size="wide"
    :setting="[
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
    ]"
    :config="store"
  />
  <!-- 页面内容 -->
  <article class="flex-col-center space-y-2">
    <h1 class="text-intro">计数器</h1>
    <p class="text-5xl">{{ store.count }}</p>
    <p class="space-x-4 pt-2">
      <button class="btn btn-sq btn-md bg-red-500 hover:bg-red-600" @click="reduce"><SubSVG class="w-5" /></button>
      <button class="btn btn-sq btn-md bg-green-500 hover:bg-green-600" @click="increase">
        <AddSVG class="w-5" />
      </button>
    </p>
  </article>
</template>

<script>
import AddSVG from '@/assets/count/add.svg'
import SubSVG from '@/assets/count/sub.svg'
import Setting from '@/components/setting.vue'

import { storage } from '~/storage'

export default {
  setup() {
    // 存储数据
    const store = storage({
      count: 3.14, // 数值
      step: 1, // 步长
    })
    return { store }
  },
  components: {
    AddSVG,
    SubSVG,
    Setting,
  },
  methods: {
    increase() {
      // 浮点数运算精度
      this.store.count = Number((this.store.count + this.store.step).toFixed(2))
    },
    reduce() {
      // 浮点数运算精度
      this.store.count = Number((this.store.count - this.store.step).toFixed(2))
    },
  },
}
</script>
