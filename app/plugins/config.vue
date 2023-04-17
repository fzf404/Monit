<!--
 * @Author: fzf404
 * @Date: 2022-09-18 01:13:05
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-17 21:13:34
 * @Description: config 应用配置
-->

<template>
  <!-- 配置 -->
  <Setting size="small" :store="store" :setting="setting" />
  <!-- 页面内容 -->
  <article class="flex-col-between p-3 pt-8">
    <section class="scrollable space-y-2">
      <!-- 插件操作 -->
      <p class="flex-row-between gap-2">
        <button class="btn btn-md btn-blue basis-2/3" @click="sendEvent('plugin-create', pluginNames)">全部开启</button>
        <button
          v-if="state.switch"
          class="btn btn-md btn-amber basis-1/3"
          @click="
            () => {
              store.boot = pluginNames
              store.auto = true
              state.switch = false
            }
          ">
          全自启
        </button>
        <button
          v-else
          class="btn btn-md btn-pink basis-1/3"
          @click="
            () => {
              store.boot = []
              state.switch = true
            }
          ">
          关自启
        </button>
      </p>
      <!-- 全部插件列表 -->
      <p v-for="item in pluginList" class="flex-row-between w-full gap-2">
        <!-- 插件启动 -->
        <button class="btn btn-md btn-purple basis-2/3" @click="sendEvent('plugin-create', item.name)">
          {{ item.name + ' - ' + item.description }}
        </button>
        <!-- 插件自启 -->
        <button
          class="btn btn-md btn-green basis-1/3"
          v-if="store.boot.includes(item.name)"
          @click="store.boot.splice(store.boot.indexOf(item.name), 1)">
          自启开
        </button>
        <button
          v-else
          class="btn btn-md btn-red basis-1/3"
          @click="store.boot.push(item.name) && sendEvent('plugin-create', item.name)">
          自启关
        </button>
      </p>
      <!-- Moint 版本 -->
      <p class="flex-col-center-bottom font-intro">Monit - {{ callEvent('app-version') }}</p>
    </section>
  </article>
</template>

<script setup>
import { reactive } from 'vue'

import { pluginList } from '~/config/plugin'
import { callEvent, sendEvent } from '~/event/send'
import { storage } from '~/lib/storage'

import Setting from '@/components/setting.vue'

// 插件列表
const pluginNames = pluginList.map((item) => item.name)

// 状态信息
const state = reactive({
  switch: true // 自启开关
})

// 存储数据
const store = storage(
  {
    auto: false,
    boot: []
  },
  {
    // 自启修改
    auto: (val) => {
      sendEvent('app-boot', val)
    }
  }
)

// 配置项
const setting = reactive([
  {
    id: 'auto',
    label: '开机自启',
    type: 'checkbox'
  },
  {
    id: 'config',
    label: '配置文件',
    type: 'button',
    options: {
      text: '⇌',
      click: () => {
        sendEvent('open-config')
      }
    }
  },
  {
    id: 'restart',
    label: '重启应用',
    type: 'button',
    options: {
      text: '↺',
      click: () => {
        sendEvent('app-restart')
      }
    }
  }
])
</script>
