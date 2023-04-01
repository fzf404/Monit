<!--
 * @Author: fzf404
 * @Date: 2022-08-15 23:02:16
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-01 15:30:05
 * @Description: 布局开发
-->

写一个 Windows 系统的布局吧！

## 🪟 Wine 布局

参考：`app/layouts/maco.vue`

### 1. 编写布局文件

> `app/layouts/wine.vue`

```vue
<template>
  <nav class="z-50">
    <!-- 状态控制器 -->
    <ul class="absolute left-2">
      <!-- 设置 -->
      <SettingSVG
        v-show="pinia.hasSetting"
        class="hover-dynamic btn-svg w-5 text-blue-400"
        @click="pinia.toggleSetting()" />
      <!-- 主题 -->
      <component :is="theme.icon" class="hover-dynamic btn-svg icon-theme w-5" @click="store.theme = theme.next" />
      <!-- 布局 -->
      <component
        :is="layout.icon"
        class="hover-dynamic btn-svg w-5 text-green-400"
        @click="store.layout = layout.next" />
      <!-- 断网提示 -->
      <WifiSVG v-show="!pinia.hasNetwork" class="hover-dynamic btn-svg w-5 text-red-400" />
    </ul>
    <!-- 窗口控制器 -->
    <ul class="absolute right-2">
      <!-- 置顶 -->
      <UpSVG
        class="btn-svg hover-dynamic w-5 text-green-400"
        :class="{ 'rotate-180': !store.top }"
        @click="store.top = !store.top" />
      <!-- 最小化 -->
      <MiniSVG class="btn-svg hover-dynamic w-5 text-yellow-400" @click="sendEvent('plugin-mini')" />
      <!-- 关闭 -->
      <CloseSVG class="btn-svg hover-dynamic w-5 text-red-400" @click="sendEvent('plugin-close')" />
    </ul>
  </nav>
</template>

<script setup>
import CloseSVG from '@/assets/layout/close.svg'
import MiniSVG from '@/assets/layout/mini.svg'
import SettingSVG from '@/assets/layout/setting.svg'
import UpSVG from '@/assets/layout/up.svg'
import WifiSVG from '@/assets/layout/wifi.svg'
import { main } from '@/pinia'
import { sendEvent } from '~/event/send'

// 初始化 pinia
const pinia = main()

// 初始化 props
defineProps(['layout', 'theme', 'store'])
</script>
```

### 2. 增加布局图标

> `app/assets/layout/wine.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9"></circle>
    <path d="M5.65 5.65l12.7 12.7"></path>
    <path d="M5.65 18.35l12.7-12.7"></path>
    <path d="M12 3a9 9 0 0 0 9 9"></path>
    <path d="M3 12a9 9 0 0 1 9 9"></path>
  </g>
</svg>
```

### 3. 增加布局配置

> `config/layout.ts`

```ts
// 布局列表
export const layoutList: layout[] = debugFilter([{ name: 'maco' }, { name: 'wine' }])
```
