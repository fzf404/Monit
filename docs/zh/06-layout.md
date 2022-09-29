<!--
 * @Author: fzf404
 * @Date: 2022-08-15 23:02:16
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-29 18:24:46
 * @Description: Monit 布局开发
-->

写一个 Windows 系统的布局吧！

## ☣️ Wine 布局

参考：`app/layouts/maco.vue`

### 1. 编写主题

> `app/layouts/wine.vue`

```vue
<template>
  <nav class="layout">
    <!-- 状态控制器 -->
    <ul class="absolute left-2 z-40">
      <!-- 设置 -->
      <SettingSVG
        v-show="store.setting.has"
        class="w-5 hover-dynamic btn-svg text-blue-400"
        @click="store.setting.show = true"
      />
      <!-- 主题 -->
      <LightSVG
        v-if="state.theme === 'dark'"
        class="w-5 hover-dynamic btn-svg text-orange-400"
        @click="state.theme = 'light'"
      />
      <PunkSVG
        v-else-if="state.theme === 'light'"
        class="w-5 hover-dynamic btn-svg text-yellow-400"
        @click="state.theme = 'punk'"
      />
      <DarkSVG v-else class="w-5 hover-dynamic btn-svg text-indigo-300" @click="state.theme = 'dark'" />
      <!-- 布局 -->
      <WineSVG class="w-5 hover-dynamic btn-svg text-cyan-500" @click="state.layout = 'maco'" />
      <!-- 断网提示 -->
      <WifiSVG v-show="!store.network" class="w-5 hover-dynamic btn-svg text-red-400" />
    </ul>

    <ul class="absolute right-2 z-40">
      <!-- 置顶 -->
      <UpSVG
        class="w-5 btn-svg hover-dynamic text-green-400"
        :class="{ 'rotate-180': state.top }"
        @click="state.top = !state.top"
      />
      <!-- 最小化 -->
      <MiniSVG class="w-5 btn-svg hover-dynamic text-yellow-400" @click="sendEvent('window-mini')" />
      <!-- 关闭 -->
      <CloseSVG class="w-5 btn-svg hover-dynamic text-red-400" @click="sendEvent('window-close')" />
    </ul>
  </nav>
</template>

<script setup>
import { sendEvent } from '#/ipc'
import { useStore } from '@/store'

import CloseSVG from '@/assets/layout/close.svg'
import MiniSVG from '@/assets/layout/mini.svg'
import UpSVG from '@/assets/layout/up.svg'

import WineSVG from '@/assets/layout/wine.svg'

import DarkSVG from '@/assets/layout/dark.svg'
import LightSVG from '@/assets/layout/light.svg'
import PunkSVG from '@/assets/layout/punk.svg'

import SettingSVG from '@/assets/layout/setting.svg'
import WifiSVG from '@/assets/layout/wifi.svg'

// 初始化 props
const props = defineProps(['state'])

// 初始化 store
const store = useStore()
</script>
```

### 2. 修改默认布局指向

> `app/layouts/maco.vue`

```vue
<!-- 布局 -->
<MacoSVG class="w-4 btn-svg text-cyan-500" @click="state.layout = 'wine'" />
```
