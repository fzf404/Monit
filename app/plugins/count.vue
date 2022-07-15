<template>
  <main>
    <!-- 窗口控制器 -->
    <Layout />
    <!-- 页面内容 -->
    <article class="h-screen flex-col-center space-y-3">
      <h1 class="text-gray-400">计数器</h1>
      <p class="pb-2 text-5xl">{{ count }}</p>
      <!-- 增加 & 减少按钮 -->
      <p class="space-x-4">
        <button class="btn bg-red-500 hover:bg-red-600" @click="reduce">-1</button>
        <button class="btn bg-green-500 hover:bg-green-600" @click="increase">+1</button>
      </p>
    </article>
  </main>
</template>

<script>
import { storage } from '../../custom/storage'
import Layout from '../layout/custom.vue'

// 信息获取
const { set, get } = storage('count')

export default {
  components: {
    Layout,
  },
  data() {
    return {
      // 读取 count 值
      count: get('count', 0),
    }
  },
  methods: {
    increase() {
      this.count += 1
    },
    reduce() {
      this.count -= 1
    },
  },
  // 监听 count 变化
  watch: {
    count() {
      set('count', this.count)
    },
  },
}
</script>

<style scoped>
/* flex 竖向居中 */
.flex-col-center {
  @apply h-screen flex flex-col justify-center items-center;
}
/* flex 横向居中 */
.flex-row-center {
  @apply flex flex-row flex-nowrap justify-center items-center;
}
</style>
