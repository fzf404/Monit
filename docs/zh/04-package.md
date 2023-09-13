<!--
 * @Author: fzf404
 * @Date: 2022-09-23 20:37:31
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-31 23:51:28
 * @Description: 功能封装
-->

`Monit` 封装了一些常用的功能，方便开发者使用。

下面是部分功能封装的说明文档。

## 💄 样式类型

> 样式文件位于 `app/theme` 目录，不同主题样式配色不同。
>
> `base.scss` 为基础样式，`light.scss` 为浅色主题，`dark.scss` 为深色主题，`punk.scss` 为赛博主题。

### 🎁 按钮样式

```vue
<button class="btn btn-lg">大型按钮</button>
<button class="btn btn-md">中型按钮</button>
<button class="btn btn-sm">小型按钮</button>
<button class="btn btn-md btn-sq">中型方按钮</button>
```

#### 按钮颜色

| 类名         | 颜色 | 类名        | 颜色 | 类名         | 颜色 |
| ------------ | ---- | ----------- | ---- | ------------ | ---- |
| `btn-red`    | 红色 | `btn-amber` | 黄色 | `btn-green`  | 绿色 |
| `btn-sky`    | 天蓝 | `btn-blue`  | 蓝色 | `btn-indigo` | 靛蓝 |
| `btn-purple` | 紫色 | `btn-pink`  | 粉色 | `btn-gray`   | 灰色 |

### 📄 文字样式

```vue
<!-- 字体样式 -->
<p class="font-intro">说明文字</p>
<!-- 文字颜色 -->
<p class="text-primary">主要文字</p>
<p class="text-secondary">次要文字</p>
<p class="text-theme">主题色文字</p>
<p class="text-dark">深色文字</p>
```

### 📐 布局样式

| 类名                     | 说明             |
| ------------------------ | ---------------- |
| `flex-col-left`          | 竖向排列靠左     |
| `flex-col-left-scroll`   | 竖向排列靠左滚动 |
| `flex-col-center`        | 竖向排列居中     |
| `flex-col-between`       | 竖向排列两端对齐 |
| `flex-col-center-left`   | 竖向排列靠左居中 |
| `flex-col-center-bottom` | 竖向排列靠下居中 |
| `flex-row-center`        | 横向排列居中     |
| `flex-row-between`       | 横向排列两端对齐 |
| `flex-row-center-right`  | 横向排列靠右居中 |
| `flex-row-center-bottom` | 横向排列靠下居中 |

## 🎃 页面组件

> 可以在插件中引入的集成组件。

### 🎇 图像组件

> 用于展示图像及提示文字，可参考 `music` 插件的使用方法。

```vue
<template>
  <Image :show="true" remark="请扫码前往 Monit 官网！" image="https://img.fzf404.art/monit/qrcode.webp" />
</template>

<script setup>
import Image from '@/components/image.vue'
</script>
```

### 💎 加载组件

> 用于展示加载中动画及提示文字，可参考 `camera` 插件的使用方法。

```vue
<template>
  <Loading :show="true" :remark="['加载中...', '正在获取资源文件', '可能需要 10s 左右']" />
</template>

<script setup>
import Loading from '@/components/loading.vue'
</script>
```

### ⚙️ 设置组件

> 用于添加设置项，可参考 `github`、`camera`、`count`、`music` 插件的使用方法。

#### 配置项

> `store` 参数请参考：[Storage](#💾-响应式存储)

| 参数   | 说明         | 类型       | 可选值                       | 默认值   |
| ------ | ------------ | ---------- | ---------------------------- | -------- |
| size   | 设置组件尺寸 | `string`   | `small` / `normal` / `large` | `normal` |
| store  | 响应式配置   | `object`   | -                            | -        |
| config | 设置项列表   | `object`   | -                            | -        |
| save   | 保存事件触发 | `function` | -                            | -        |

#### 代码示例

```vue
<template>
  <Setting :store="store" :setting="setting" @save="save" />
  <article class="flex-col-center">
    <h1 class="text-primary text-lg">Setting</h1>
  </article>
</template>

<script setup>
import { reactive } from 'vue'

import { sendAlert } from '~/event/send'
import { storage } from '~/lib/storage'

import Setting from '@/components/setting.vue'

// 设置值
const store = storage({
  name: 'fzf404', // 输入框
  age: 18, // 数字输入框
  gender: true, // 开关框
  language: 'cn' // 下拉框
})

// 设置项
const setting = reactive([
  {
    id: 'name',
    label: '用户名',
    type: 'text' // 文字输入框
  },
  {
    id: 'age',
    label: '年龄',
    type: 'number', // 数字输入框
    options: {
      len: 3 // 长度限制
    }
  },
  {
    id: 'gender',
    label: '性别',
    type: 'checkbox' // 开关框
  },
  {
    id: 'language',
    label: '语言',
    type: 'select', // 下拉框
    options: [
      { label: '中文', value: 'cn' },
      { label: '英语', value: 'us' }
    ]
  },
  {
    label: '保存',
    type: 'button', // 按钮
    help: 'https://monit.fzf404.art/', // 帮助文档
    options: {
      text: '录 入', // 按钮文字
      click: () => {
        sendAlert('保存成功！') // 发送弹窗
      }
    }
  }
])

const save = () => {
  sendAlert('设置已保存！')
}
</script>
```

## 🚀 功能封装

### 💾 响应式存储

> 使用 `storage` 函数创建响应式变量，继承至 `vue` 中的 `reactive` 方法。
>
> 参数 ① 为变量名及其默认值，参数 ② 为变量修改后的毁掉函数。
>
> 响应式变量存储至本地文件，重启插件会自动读取并覆盖默认值。

```js
import { storage } from '~/lib/storage'

const store = storage(
  {
    // 响应式数据
    name: 'fzf404'
  },
  {
    // 监听修改
    name: (val) => {
      console.log(val)
    }
  }
)
```

### 🌐 网络请求

> 通过 `request` 函数创建网络请求。

```js
import { request } from '~/lib/request'

// 创建请求
const axios = request('https://api.fzf404.art/')

// 发送请求
axios.get('/ping').then((res) => {
  console.log(res)
})
```

## 🧰 事件封装

### 📱 调用事件

```js
import { sendEvent, callEvent, sendAlert } from '~/event/send'

// 置顶窗口
sendEvent('plugin-sticky')
// 获取应用版本
const verison = callEvent('app-version')
// 发送弹窗
sendAlert(`当前应用版本为：${verison}`)
```

### 📖 事件列表

> 只列出了常用事件，更多请前往 `event/handle.ts` 查看。

| 事件名           | 封装名                           | 功 能        |
| ---------------- | -------------------------------- | ------------ |
| `plugin-notice`  | `sendNotice(message)`            | 发送通知     |
| `plugin-alert`   | `sendAlert(message)`             | 发送弹窗     |
| `plugin-confirm` | `sendConfirm(message, callback)` | 发送确认弹窗 |
| `open-url`       | `openFile('image')`              | 打开图像     |
| `open-file`      | `openFile('all')`                | 打开文件     |
