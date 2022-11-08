<!--
 * @Author: fzf404
 * @Date: 2022-09-23 20:37:31
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-11-08 22:56:16
 * @Description: 功能封装
-->

Monit 封装了一些常用的功能，方便开发者使用。

## 🎃 功能组件

> 可以在插件中引入的集成组件

### 🎇 图像

> 用于展示图像，并携带提示文字，可参考 `music` 插件中的使用方法

```vue
<template>
  <Image :show="true" remark="扫码前往 Monit 官网" image="https://img.fzf404.art/Monit/qrcode.webp" />
</template>

<script setup>
import Image from '@/components/image.vue'
</script>
```

### 🎲 加载

> 用于展示加载中动画，并携带提示文字，可参考 `camera` 插件中的使用方法

```vue
<template>
  <Loading :show="true" :remark="['加载中...', '正在获取资源文件', '可能需要 10s 左右']" />
</template>

<script setup>
import Loading from '@/components/loading.vue'
</script>
```

### ⚙️ 设置

> 用于添加设置项，可参考 `github` 插件中的使用方法

#### 配置项

| 参数 | 说明       | 类型     | 可选值 | 默认值 |
| ---- | ---------- | -------- | ------ | ------ |
| size | 设置框尺寸 | `string` | wide   | -      |

```vue

```
