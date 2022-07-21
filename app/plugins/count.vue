<!--
 * @Author: fzf404
 * @Date: 2022-07-15 22:03:19
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-21 22:00:03
 * @Description: 计数器
-->
<template>
  <main>
    <!-- 窗口控制器 -->
    <Layout />
    <!-- 页面内容 -->
    <article>
      <!-- 设置 -->
      <aside class="setting setting-sm" v-show="store.setting">
        <!-- 中心框 -->
        <ul>
          <!-- 数值 -->
          <li>
            <label for="count-number">数值</label>
            <input
              id="count-number"
              type="number"
              oninput="if(value.length > 5) value = value.slice(0, 5)"
              v-model.lazy="count"
              @keyup.enter="store.setting = false"
            />
          </li>
          <!-- 步长 -->
          <li>
            <label for="step-number">步长</label>
            <input
              id="step-number"
              type="number"
              oninput="if(value.length > 3) value = value.slice(0, 3)"
              v-model.lazy="step"
              @keyup.enter="store.setting = false"
            />
          </li>
          <!-- 保存 -->
          <ol>
            <button @click="store.setting = false">OK</button>
          </ol>
        </ul>
      </aside>
      <!-- 主体 -->
      <section class="h-screen flex-col-center space-y-2">
        <h1 class="text-intro">计数器</h1>
        <p class="text-5xl">{{ count }}</p>
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
import AddSVG from '@/assets/count/add.svg'
import SubSVG from '@/assets/count/sub.svg'
import Layout from '@/layouts/mato.vue'
import { storage } from '~/storage'

// 初始化存储类
const { set, get } = storage('count')

export default {
  setup() {
    // 初始化 store
    return { store: useMainStore() }
  },
  components: {
    Layout,
    AddSVG,
    SubSVG,
  },
  data() {
    return {
      // 读取 count 值
      count: get('count', 0), // 数字
      // 读取 step 值
      step: get('step', 1), // 步长
    }
  },
  methods: {
    increase() {
      // 浮点数运算精度
      this.count = Number((this.count + this.step).toFixed(2))
    },
    reduce() {
      // 浮点数运算精度
      this.count = Number((this.count - this.step).toFixed(2))
    },
  },
  // 监听 count 变化
  watch: {
    count() {
      set('count', this.count)
    },
    setp() {
      set('step', this.step)
    },
  },
}
</script>
