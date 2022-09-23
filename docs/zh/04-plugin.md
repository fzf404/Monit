<!--
 * @Author: fzf404
 * @Date: 2022-08-15 23:02:16
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-22 20:41:50
 * @Description: Monit 插件开发
-->

来写一个计数器吧！

推荐使用 vscode 作为代码编辑器

安装 tailwindcss 插件后，将鼠标移至 class 上可查看样式 css

## 🚀 计数器

### 1. clone 本项目

```bash
git clone https://github.com/fzf404/Monit.git -b beta --depth 1
```

### 2. 安装项目依赖

```bash
# 假如您使用 npm，请安装 pnpm
npm i -g pnpm

# 更换国内源
pnpm config set registry https://registry.npmmirror.com
pnpm config set electron_mirror https://registry.npmmirror.com/-/binary/electron/

# 使用 pnpm 安装依赖
pnpm i
```

### 3. 【可选】引入 svg 图像

> 推荐使用 svg 作为图像，可以去 [xicons](https://www.xicons.org/) 寻找

```vue
<template>
  <!-- 指定 svg 颜色-->
  <XxxSVG class="h-4 stroke-current text-green-400" />
</template>

<script setup>
// 引入 svg
import XxxSVG from '@/assets/xx/xxx.svg'
</script>
```

### 4. 编写插件页面

> `app/plugins/count.vue`

```vue
<template>
  <main>
    <!-- 设置 -->
    <Setting size="small" :setting="setting" :config="config" />
    <!-- 页面内容 -->
    <article>
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
    // 配置项
    const config = reactive({
      // 读取 count 值
      count: 0, // 数值
      // 读取 setp 值
      step: 1, // 步长
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
```

### 5. 增加插件配置

> `coustom/plugin.ts`

```typescript
export const plugin: pluginList[] = [
  // ...添加如下行
  { name: 'count', size: [2, 2], description: '计数器', debug: true },
]
```

### 6. 启动 & 打包

> 按 `Ctrl + Shift + I` 打开调试工具

```bash
# 调试应用
pnpm serve
# 在托盘中启动 count 插件

# 构建应用
pnpm build
# 构建成功后即可在 dist_electron 找到安装包
```
