<!--
 * @Author: fzf404
 * @Date: 2022-08-15 23:02:16
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2022-11-09 22:10:56
 * @Description: 插件开发
-->

来写一个计数器吧！

## 🚀 计数器

### 1. 引入 svg 图像

> 推荐使用 svg 作为图像，可以去 [xicons](https://www.xicons.org/) 寻找

```vue
<template>
  <!-- 指定 svg 颜色-->
  <XxxSVG class="btn-svg h-4 text-green-400" />
</template>

<script setup>
// 引入 svg
import XxxSVG from '@/assets/xx/xxx.svg'
</script>
```

### 2. 编写插件页面

> `app/plugins/count.vue`

```vue
<template>
  <!-- 设置 -->
  <Setting size="wide" :store="store" :setting="setting" />
  <!-- 页面内容 -->
  <article class="flex-col-center space-y-2">
    <h1 class="text-intro">计数器</h1>
    <p class="text-light text-5xl">{{ store.count }}</p>
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

import { storage } from '~/storage'

import AddSVG from '@/assets/count/add.svg'
import SubSVG from '@/assets/count/sub.svg'
import Setting from '@/components/setting.vue'

export default {
  setup() {
    // 存储数据
    const store = storage({
      count: 3.14, // 数值
      step: 1, // 步长
    })

    // 设置项
    const setting = reactive([
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
    ])
    return { store, setting }
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
```

### 3. 增加插件配置

> `coustom/plugin.ts`

```typescript
export const plugin: pluginList[] = [
  // ...添加如下行
  { name: 'count', size: [2, 2], description: '计数器', debug: true },
]
```
