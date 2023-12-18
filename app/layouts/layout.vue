<!--
 * @Author: fzf404
 * @Date: 2022-08-12 10:39:12
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-27 18:16:26
 * @Description: 布局切换
-->

<template>
  <div v-if="!store.lock" class="drag-bar" />
  <transition name="fade" mode="out-in" v-show="store.titlebarType === 'show' || (isHovering && isWindowActive)">
    <component
      :is="layout[store.layout].component"
      :layout="layout[store.layout]"
      :theme="theme[store.theme]"
      :store="store" />
  </transition>
  <router-view></router-view>
</template>

<script setup>
import { defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'

import { layoutList } from '~/config/layout'
import { themeList } from '~/config/theme'
import { getValue, isMouseInPlugin, onEvent, sendEvent } from '~/event/send'
import { storage } from '~/lib/storage'

// 布局处理
const layout = layoutList.reduce((result, current, index, source) => {
  result[current.name] = {
    name: current.name,
    next: source[index + 1] ? source[index + 1].name : source[0].name,
    icon: defineAsyncComponent(() => import(`@/assets/layout/${current.name}.svg`)),
    component: defineAsyncComponent(() => import(`./${current.name}.vue`))
  }
  return result
}, {})

// 主题处理
const theme = themeList.reduce((result, current, index, source) => {
  result[current.name] = {
    name: current.name,
    next: source[index + 1] ? source[index + 1].name : source[0].name,
    icon: defineAsyncComponent(() => import(`@/assets/theme/${current.name}.svg`)),
    component: defineAsyncComponent(() => import(`./${current.name}.vue`))
  }
  return result
}, {})

// 存储数据
const store = storage(
  {
    top: false, // 置顶
    lock: false,
    titlebarType: 'show',
    layout: layout.maco.name, // 布局
    theme: theme.dark.name // 主题
  },
  {
    top: (val) => {
      sendEvent('plugin-sticky', val)
    },
    lock: (val) => {
      sendEvent('plugin-lock', val)
    },
    theme: (val) => {
      document.body.setAttribute('class', val)
    }
  }
)

const isWindowActive = ref(true)
const isHovering = ref(isMouseInPlugin())

const onWindowBlur = () => {
  isWindowActive.value = false
}
const onWindowFocus = () => {
  isWindowActive.value = true
}

onEvent('mouseenter', () => {
  isHovering.value = true
})

onEvent('mouseleave', () => {
  isHovering.value = false
})

onMounted(() => {
  document.body.setAttribute('class', store.theme)
  window.addEventListener('blur', onWindowBlur)
  window.addEventListener('focus', onWindowFocus)
})

onUnmounted(() => {
  // 当组件卸载时，移除事件监听器
  window.removeEventListener('blur', onWindowBlur)
  window.removeEventListener('focus', onWindowFocus)
})
</script>

<style>
.drag-bar {
  -webkit-app-region: drag;
  position: absolute;
  width: 100%;
  height: 30px;
}
</style>
