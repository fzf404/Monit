<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

import { useControl } from '@/hooks/control'
import { useSetting } from '@/hooks/setting'
import { refreshPlugin } from '@/utils/plugin'
import { openURL } from '@/utils/system'

import { setPluginStorageData } from '../utils/storage'

const width = window.innerWidth

const { t, locale } = useI18n()

const { control } = useControl()
const { setting } = useSetting()

const cache = reactive({})

watchEffect(() => {
  for (const key in setting) {
    cache[key] = setting[key].value
  }
})

const onSave = () => {
  for (const key in setting) {
    setting[key].value = cache[key]
  }
  setPluginStorageData('setting', cache)
}
</script>

<template>
  <menu v-show="control.setting" class="z-40 modal">
    <ul
      class="rounded-lg bg-gray-200 py-3 ring-4 space-y-2 moon:bg-gray-800 moon:ring-purple-600/60 sun:ring-blue-500/60"
      :class="{
        'w-3/4 px-2': width < 300,
        'w-3/5 px-4': width >= 300 && width <= 600,
        'w-3/6 px-6': width > 600,
      }"
    >
      <li
        v-for="(item, key) in setting"
        :key="key"
        class="h-7 flex-row-between rounded px-2 shadow moon:bg-gray-700 sun:bg-white"
      >
        <label :for="key" class="flex gap-x-1 text-xs">
          <span class="text-gray-400">
            {{ item.label[locale] }}
          </span>
          <svg
            v-if="item.help"
            class="i-ic-twotone-help self-center moon:text-gray-500 sun:text-gray-300"
            @click="openURL(item.help)"
          ></svg>
        </label>
        <input
          v-if="item.type === 'text'"
          :id="key"
          v-model.lazy="cache[key]"
          type="text"
          :class="{
            'w-3/6': width < 300,
            'w-3/5': width >= 300 && width <= 600,
            'w-3/4': width > 600,
          }"
          class="text-right shadow-inner box-sm bg-color text-theme"
          @input="
            (event) => {
              if (typeof item.length === 'number') {
                const element = event.target as HTMLInputElement
                if (element.value.length > item.length) {
                  element.value = element.value.slice(0, item.length)
                }
              }
            }
          "
        />
        <input
          v-else-if="item.type === 'number'"
          :id="key"
          v-model.lazy="cache[key]"
          type="number"
          :class="{
            'w-3/6': width < 300,
            'w-3/5': width >= 300 && width <= 600,
            'w-3/4': width > 600,
          }"
          class="text-right shadow-inner box-sm bg-color text-theme"
          @input="
            (event) => {
              if (typeof item.length === 'number') {
                const element = event.target as HTMLInputElement
                if (element.value.length > item.length) {
                  element.value = element.value.slice(0, item.length)
                }
              }
            }
          "
        />
        <input
          v-else-if="item.type === 'switch'"
          :id="key"
          v-model="cache[key]"
          type="checkbox"
          class="text-theme accent-theme"
        />
        <select
          v-else-if="item.type === 'select'"
          :id="key"
          v-model="cache[key]"
          :class="{
            'w-3/6': width < 300,
            'w-3/5': width >= 300 && width <= 600,
            'w-3/4': width > 600,
          }"
          class="text-right box-sm moon:bg-gray-800 text-theme"
        >
          <option v-for="(v, k) in item.options" :key="k" :value="k">
            {{ v }}
          </option>
        </select>
        <button
          v-else-if="item.type === 'button'"
          class="w-1/3 box-sm bg-theme text-secondary"
          @click="
            async () => {
              cache[key] = await item.click()
            }
          "
        >
          <svg class="i-ic-twotone-ads-click mb-0.5"></svg>
        </button>
      </li>
      <ol class="flex-row-right gap-x-2 text-secondary">
        <button class="box-md bg-danger" @click.once="refreshPlugin">
          {{ t('refresh') }}
        </button>
        <button class="box-md bg-theme" @click.once="onSave">
          {{ t('save') }}
        </button>
      </ol>
    </ul>
  </menu>
</template>

<i18n lang="json">
{
  "cn": {
    "save": "保存",
    "refresh": "刷新"
  },
  "en": {
    "save": "Save",
    "refresh": "Refresh"
  }
}
</i18n>

<style scoped>
input[type='number']::-webkit-inner-spin-button {
  appearance: none;
}
</style>
