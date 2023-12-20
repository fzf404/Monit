<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useSetting } from '@/hooks/setting'
import { useStorage } from '@/hooks/storage'

const { t } = useI18n()

const { setting } = await useSetting({
  step: {
    value: 0.1,
    type: 'number',
    label: {
      cn: '步长',
      en: 'Step',
    },
    length: 3,
  },
})

const storage = await useStorage({ number: 3.14 })

const increase = () => {
  storage.number = Number((storage.number + setting.step.value).toFixed(2))
}
const decrease = () => {
  storage.number = Number((storage.number - setting.step.value).toFixed(2))
}
</script>

<template>
  <section class="screen flex-col-center gap-y-2.5 p-3 pt-6 font-mono">
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
