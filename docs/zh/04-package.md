<!--
 * @Author: fzf404
 * @Date: 2022-09-23 20:37:31
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2022-11-09 22:10:08
 * @Description: 功能封装
-->

Monit 封装了一些常用的功能，方便开发者使用。

## 🎃 功能组件

> 可以在插件中引入的集成组件

### 🎇 图像

> 用于展示图像及提示文字，可参考 `music` 插件的使用方法

```vue
<template>
  <Image :show="true" remark="扫码前往 Monit 官网" image="https://img.fzf404.art/Monit/qrcode.webp" />
</template>

<script setup>
import Image from '@/components/image.vue'
</script>
```

### 💎 加载

> 用于展示加载中动画及提示文字，可参考 `camera` 插件的使用方法

```vue
<template>
  <Loading :show="true" :remark="['加载中...', '正在获取资源文件', '可能需要 10s 左右']" />
</template>

<script setup>
import Loading from '@/components/loading.vue'
</script>
```

### ⚙️ 设置

> 用于添加设置项，可参考 `github`、`camera`、`count`、`music` 插件的使用方法

#### 配置项

> `storage` 请参考：[Storage](#响应式存储)

| 参数   | 说明   | 类型       | 可选值 | 默认值 |
| ------ | ------ | ---------- | ------ | ------ |
| size   | 尺寸   | `string`   | wide   | -      |
| store  | 设置值 | `object`   | -      | -      |
| config | 设置项 | `object`   | -      | -      |
| save   | 保存   | `function` | -      | -      |

#### 代码示例

```vue
<template>
  <Setting :store="store" :setting="setting" @save="save" />
</template>

<script setup>
import { reactive } from 'vue'

import { storage } from '~/storage'
import { sendAlert } from '#/ipc'

import Setting from '@/components/setting.vue'

// 设置值
const store = storage({
  name: 'fzf404',
  password: 114514,
  auto: true,
  server: 'cn',
})

// 设置项
const setting = reactive([
  {
    id: 'name',
    label: '用户名',
    type: 'text', // 文字输入框
  },
  {
    id: 'password',
    label: '校验码',
    type: 'number', // 数字输入框
    options: {
      len: 9, // 长度
    },
  },
  {
    id: 'auto',
    label: '自动',
    type: 'checkbox', // 选择框
  },
  {
    id: 'server',
    label: '服务器',
    type: 'select', // 下拉框
    options: {
      list: [
        { label: '中国', value: 'cn' },
        { label: '美国', value: 'us' },
      ],
    },
  },
  {
    label: '登录',
    type: 'button', // 按钮
    help: 'https://monit.fzf404.art/', // 说明链接
    options: {
      text: '登 陆', // 按钮文字
      click: () => {
        sendAlert('登陆成功！') // 发送弹窗
      },
    },
  },
])

const save = () => {
  sendAlert('设置已保存！')
}
</script>
```

## 功能封装

待续...
