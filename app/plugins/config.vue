<template>
  <Setting size="sm" :setting="setting" :config="config" />
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
              config.open = ['welcome']
              state.open = true
            }
          "
        >
          关自启
        </button>
      </p>
      <p v-for="item in pluginList" class="w-full flex-row-between">
        <button class="btn btn-sm btn-purple w-2/3">{{ item.name + ' - ' + item.description }}</button>
        <button
          class="btn btn-sm btn-green"
          v-if="config.open.includes(item.name)"
          @click="config.open.splice(config.open.indexOf(item.name), 1)"
        >
          自启开
        </button>
        <button v-else class="btn btn-sm btn-red" @click="config.open.push(item.name)">自启关</button>
      </p>
    </section>
  </article>
</template>

<!-- TODO 插件 config -->
<script setup>
import { storage } from '~/storage'

import { sendEvent } from '#/ipc'
import { pluginList } from '#/plugin'

import Setting from '@/components/setting.vue'
import { reactive } from 'vue'

const { get } = storage()

const state = reactive({
  open: true,
})

const setting = [
  {
    id: 'open',
    label: '开机自启',
    type: 'checkbox',
  },
]

const config = reactive({
  open: get('open', []),
})
</script>
