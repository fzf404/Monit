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

### 3. 编写插件页面

> `app/plugins/count-new.vue`

```vue
<template>
  <main>
    <!-- 窗口控制器 -->
    <Layout />
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
          <button class="btn btn-sq bg-green-500 hover:bg-green-600" @click="increase">
            <AddSVG class="w-5" />
          </button>
        </p>
      </section>
    </article>
  </main>
</template>

<script>
import AddSVG from '@/assets/count/add.svg'
import SubSVG from '@/assets/count/sub.svg'
import Setting from '@/components/setting.vue'
import Layout from '@/layouts/layout.vue'
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
    Layout,
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

### 4. 增加插件配置

> `coustom/plugin.ts`

```typescript
export const pluginList: pluginList[] = [
  // ...添加如下行
  { name: 'count-new', size: [2, 2], description: '计数器', debug: true },
]
```

### 5. 启动 & 打包

```bash
# 调试应用
pnpm serve
# 在托盘中启动 count 插件

# 构建应用
pnpm build
# 构建成功后即可在 dist_electron 找到安装包
```
