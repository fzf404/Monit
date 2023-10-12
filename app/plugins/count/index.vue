<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useSetting } from '@/hooks/component'
import { useStorage } from '~/app/hooks/storage'

const { t } = useI18n()

const setting = await useSetting({
  menu: {
    count: {
      value: 3.14,
      type: 'number',
      label: {
        cn: '数值',
        en: 'Count',
      },
      length: 5,
    },
    step: {
      value: 0.1,
      type: 'number',
      label: {
        cn: '步长',
        en: 'Step',
      },
      length: 3,
    },
  },
  callback: () => {
    setNumber()
  },
})

const storage = await useStorage({ number: setting.menu.count.value })

const setNumber = () => {
  storage.number = setting.menu.count.value
}
const increase = () => {
  storage.number = Number((storage.number + setting.menu.step.value).toFixed(2))
}
const decrease = () => {
  storage.number = Number((storage.number - setting.menu.step.value).toFixed(2))
}
</script>

<template>
  <section class="flex-col-center gap-y-2.5 p-3 pt-6 font-mono">
    <p class="text-lg text-info">{{ t('title') }}</p>
    <h1 class="text-4xl font-mono text-primary">
      {{ storage.number }}
    </h1>
    <p class="mt-1 space-x-4">
      <button class="box-sq bg-danger" @click="decrease">
        <svg class="i-ic-twotone-remove-circle h-7 w-7 text-secondary"></svg>
      </button>
      <button class="box-sq bg-success" @click="increase">
        <svg class="i-ic-twotone-add-circle h-7 w-7 text-secondary"></svg>
      </button>
    </p>
  </section>
</template>

<i18n lang="json">
{
  "cn": {
    "title": "计数器"
  },
  "en": {
    "title": "Counter"
  }
}
</i18n>
