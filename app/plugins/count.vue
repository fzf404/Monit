<!--
 * @Author: fzf404
 * @Date: 2022-07-15 22:03:19
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-29 22:22:16
 * @Description: count 计数器
-->

<template>
  <!-- 设置 -->
  <Setting size="small" :store="store" :setting="setting" />
  <!-- 页面内容 -->
  <article class="flex-col-center gap-2">
    <h1 class="font-intro">计数器</h1>
    <p class="text-primary text-5xl">{{ store.count }}</p>
    <p class="space-x-4 pt-2">
      <button class="btn btn-sq btn-lg btn-red" @click="reduce"><SubSVG class="w-5" /></button>
      <button class="btn btn-sq btn-lg btn-green" @click="increase">
        <AddSVG class="w-5" />
      </button>
    </p>
  </article>
</template>

<script>
import { reactive } from 'vue'

import { storage } from '~/lib/storage'

import AddSVG from '@/assets/plugin/count/add.svg'
import SubSVG from '@/assets/plugin/count/sub.svg'
import Setting from '@/components/setting.vue'

export default {
  setup() {
    // 存储数据
    const store = storage({
      step: 1, // 步长
      count: 3.14 // 数值
    })

    // 设置项
    const setting = reactive([
      {
        id: 'count',
        label: '数值',
        type: 'number',
        options: {
          len: 5
        }
      },
      {
        id: 'step',
        label: '步长',
        type: 'number',
        options: {
          len: 3
        }
      }
    ])
    return { store, setting }
  },
  components: {
    AddSVG,
    SubSVG,
    Setting
  },
  methods: {
    increase() {
      // 浮点数运算精度
      this.store.count = Number((this.store.count + this.store.step).toFixed(2))
    },
    reduce() {
      // 浮点数运算精度
      this.store.count = Number((this.store.count - this.store.step).toFixed(2))
    }
  }
}
</script>
