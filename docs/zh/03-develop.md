<!--
 * @Author: fzf404
 * @Date: 2022-09-23 20:37:31
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-31 23:09:47
 * @Description: 开发文档
-->

推荐使用 `Visual Studio Code` 作为代码编辑器，并安装推荐插件。

应用共分为 `渲染进程` 和 `主进程` 两部分。

## 🥇 运行项目

> 在开始任何项目之前，一定要先把项目运行起来。

```bash
# 1. clone 项目
git clone https://github.com/fzf404/Monit.git -b dev --depth 1

# 2. 安装 pnpm
npm install -g pnpm

# 3. 安装依赖
pnpm install

# 4. 运行项目
pnpm dev

# 5. 打包项目
pnpm build
```

### 🖱️ 开发说明

> 构建成功后可在 `release` 目录下找到安装包。

使用快捷键 `Ctrl + R / Cmd + R` 重新加载页面。

使用快捷键 `Ctrl + Shift + I / Cmd + Option + I` 打开开发者工具。

### 🏆 贡献指南

> 欢迎提交 `Pull Requests`，如果有任何问题，可以在 `Issues` 中提出。

请将代码提交到 `dev` 分支。

使用 `prettier` 格式化代码，执行 `commit` 操作时通过 `husky` 自动进行代码格式化。

`Visual Studio Code` 中安装 `Todo Tree` 插件后，可以在 `待办事项` 标签页查看项目的 `TODO` 事项。

## 🎇 渲染进程

> 渲染进程使用 `vue` 进行开发。

### 🎡 插件开发

> 首先需要在 `app/plugins` 目录下新建插件。

#### 1. 创建插件

> 创建 `app/plugins/demo.vue` 文件。

```vue
<template>
  <article class="flex-col-center">
    <h1 class="text-primary text-lg">Demo</h1>
  </article>
</template>
```

可以在 `app/theme/base.scss` 中找到 `flex-col-center` 的样式定义。

可以在 `app/theme/dark.scss` 中找到 `text-primary` 的样式定义。

可以在 [tailwindcss](https://tailwindcss.com/) 文档中找到 `text-lg` 的样式定义。

#### 2. 注册插件

> 修改 `config/plugin.ts` 文件。

```ts
{ name: 'demo', size: [2, 2], description: '示例', debug: true },
```

可以在 `app/router.ts` 中查看自动生成路由的代码。

#### 3. 响应式存储

> 修改 `app/plugins/demo.vue` 文件。

```vue
<template>
  <article class="flex-col-center">
    <h1 class="text-primary text-lg">{{ store.title }}</h1>
  </article>
</template>

<script setup>
import { storage } from '~/lib/storage'

// 响应式存储
const store = storage({
  title: 'Demo'
})
</script>
```

使用此方式定义的变量会在存储至本地文件，当插件重启时会读取本地文件中的数据。

可以在 `lib/storage.ts` 中查看响应式存储的代码。

#### 4. 开启设置

> 修改 `app/plugins/demo.vue` 文件。

```vue
<template>
  <Setting size="small" :setting="[{ id: 'title', label: '标题', type: 'text' }]" :store="store" />
  <article class="flex-col-center">
    <h1 class="text-primary text-lg">{{ store.title }}</h1>
  </article>
</template>

<script setup>
import { storage } from '~/lib/storage'

import Setting from '@/components/setting.vue'

// 响应式存储
const store = storage({
  title: 'Demo'
})
</script>
```

接下来就可以在设置中实时编辑标题的文字了。

可以在 `app/components/setting.vue` 中查看 `setting` 组件的代码。

#### 5. 发送通知

> 修改 `app/plugins/demo.vue` 文件。

```vue
<template>
  <Setting size="small" :setting="setting" :store="store" :onSave="onSave" />
  <article class="flex-col-center">
    <h1 class="text-primary text-lg">{{ store.title }}</h1>
  </article>
</template>

<script setup>
import { sendAlert, sendNotice } from '~/event/send'
import { storage } from '~/lib/storage'

import Setting from '@/components/setting.vue'

// 设置项
const setting = [
  {
    id: 'notice',
    label: '消息通知',
    type: 'checkbox'
  },
  { id: 'title', label: '标题', type: 'text' }
]

// 响应式存储
const store = storage(
  {
    title: 'Demo',
    notice: false
  },
  {
    // 监听设置项
    title: () => {
      // 发送通知
      store.notice && sendNotice(`标题已改为：${store.title}`)
    }
  }
)

// 设置保存
const onSave = () => {
  // 发送提醒
  sendAlert(`设置已保存！`)
}
</script>
```

此时在修改设置点击保存后，会弹窗：`设置已保存！`。

在 `title` 修改时，会弹出通知：`标题已改为：xxx`。

可以在 `event/send.ts` 中查看 `sendAlert` 和 `sendNotice` 的代码。

可以在 `event/handle.ts` 中查看处理事件代码。

#### 6. 更多

> 更多请查看插件的源码。
>
> 程序员成长的标志就是能读懂别人的代码。

建议阅读顺序：`welcome` -> `count` -> `todo` -> `github` -> `music` 。

### 💡 主题开发

> 请参考 [主题开发](https://monit.fzf404.art/#/zh/06-theme) 。

### ⛰️ 布局开发

> 请参考 [布局开发](https://monit.fzf404.art/#/zh/07-layout) 。

## 🍥 主进程

> 主进程使用 `electron` 进行开发。

### 🎹 快捷键

> 修改 `core/shortcut.ts` 文件。

```ts
// 注册快捷键
Shortcut.register('CommandOrControl+Shift+,', () => {
  // 打开配置插件
  createPlugin('config')
})
```

### 🌈 系统调用

#### 1. 功能封装

> 修改 `server/system.ts` 文件。

```ts
import os from 'os'

export const getCPUInfo = () => {
  // 获取 CPU 信息
  return os.cpus()
}
```

#### 2. 处理监听事件

> 修改 `event/handle.ts` 文件。

```ts
import { getCPUInfo } from '~/server/system'

ipcMain.on('get-cpu-model', () => {
  event.returnValue = getCPUInfo()[0].model
})
```

#### 3. 触发/调用事件

> 触发事件使用 `sendEvent()` 调用，返回事件使用 `callEvent()` 调用。

```ts
import { sendAlert, sendEvent, callEvent } from '~/server/system'

const model = callEvent('get-cpu-model')

// 两种方式发送弹窗
sendAlert(model)
sendEvent('plugin-alert', model)
```
