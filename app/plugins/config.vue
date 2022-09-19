<!--
 * @Author: fzf404
 * @Date: 2022-09-18 01:13:05
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-19 21:05:08
 * @Description: config 插件设置
-->
<template>
  <Setting size="small" :setting="setting" :config="config" />
  <article class="flex flex-col justify-between pt-8 p-3">
    <section class="overflow-hidden overflow-y-scroll space-y-2">
      <p class="w-full flex-row-between">
        <button
          class="btn btn-sm btn-blue w-2/3"
          @click="pluginList.map((item) => sendEvent('window-open', item.name))"
        >
          全部开启
        </button>
        <button
          v-if="state.open"
          class="btn btn-sm btn-yellow"
          @click="
            () => {
              config.open = pluginList.map((item) => item.name)
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
              config.open = []
              state.open = true
            }
          "
        >
          关自启
        </button>
      </p>
      <p v-for="item in pluginList" class="w-full flex-row-between">
        <button class="btn btn-sm btn-purple w-2/3" @click="sendEvent('window-open', item.name)">
          {{ item.name + ' - ' + item.description }}
        </button>
        <button
          class="btn btn-sm btn-green"
          v-if="config.open.includes(item.name)"
          @click="config.open.splice(config.open.indexOf(item.name), 1)"
        >
          自启开
        </button>
        <button v-else class="btn btn-sm btn-red" @click="config.open.push(item.name)">自启关</button>
      </p>
      <p class="flex-col-center-end text-intro">Monit {{ pkg.version }}</p>
    </section>
  </article>
</template>

<script setup>
import { reactive, watch } from 'vue'

import { sendEvent } from '#/ipc'
import { pluginList } from '#/plugin'
import pkg from 'root/package.json'
import { storage } from '~/storage'

import Setting from '@/components/setting.vue'

const { get } = storage()

const state = reactive({
  open: true,
})

const setting = [
  {
    id: 'auto',
    label: '开机自启',
    type: 'checkbox',
  },
]

const config = reactive({
  open: get('open', []),
  auto: get('auto', false),
})

watch(
  () => config.auto,
  (val) => {
    sendEvent('auto-open', val)
  }
)
</script>
