<!--
 * @Author: fzf404
 * @Date: 2022-09-18 01:13:05
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-10-03 15:01:10
 * @Description: config 插件设置
-->
<template>
  <!-- 设置-->
  <Setting
    size="wide"
    :setting="[
      {
        id: 'auto',
        label: '开机自启',
        type: 'checkbox',
      },
    ]"
    :config="store"
  />
  <!-- 页面内容 -->
  <article class="flex-col-between pt-8 p-3">
    <section class="scrollable space-y-2">
      <!-- 插件操作 -->
      <p class="flex-row-between w-full">
        <button
          class="btn btn-sm btn-blue w-2/3"
          @click="pluginList.forEach((item) => sendEvent('window-open', item.name))"
        >
          全部开启
        </button>
        <button
          v-if="state.open"
          class="btn btn-sm btn-yellow"
          @click="
            () => {
              store.open = pluginList.map((item) => item.name)
              state.open = false
            }
          "
        >
          全自启
        </button>
        <button
          v-else
          class="btn btn-sm btn-pink"
          @click="
            () => {
              store.open = []
              state.open = true
            }
          "
        >
          关自启
        </button>
      </p>
      <!-- 全部插件列表 -->
      <p v-for="item in pluginList" class="w-full flex-row-between">
        <!-- 插件启动 -->
        <button class="btn btn-sm btn-purple w-2/3" @click="sendEvent('window-open', item.name)">
          {{ item.name + ' - ' + item.description }}
        </button>
        <!-- 插件自启 -->
        <button
          class="btn btn-sm btn-green"
          v-if="store.open.includes(item.name)"
          @click="store.open.splice(store.open.indexOf(item.name), 1)"
        >
          自启开
        </button>
        <button v-else class="btn btn-sm btn-red" @click="store.open.push(item.name)">自启关</button>
      </p>
      <!-- Moint 版本 -->
      <p class="flex-col-center-bottom text-intro">Monit {{ pkg.version }}</p>
    </section>
  </article>
</template>

<script setup>
import { reactive } from 'vue'

import { sendEvent } from '#/ipc'
import { pluginList } from '#/plugin'
import pkg from 'root/package.json'
import { storage } from '~/storage'

import Setting from '@/components/setting.vue'

// 状态信息
const state = reactive({
  open: true,
})

// 存储数据
const store = storage(
  {
    auto: false,
    open: [],
  },
  // 自启修改
  {
    auto: (val) => {
      sendEvent('auto-open', val)
    },
  }
)
</script>
