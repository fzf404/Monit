<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import MonitSVG from './assets/monit.svg'

const { t } = useI18n({
  locale: 'zh',
})
</script>

<template>
  <section class="flex-col-center">
    <h1 class="text-lg text-gray-200">{{ t('title') }}</h1>

    <img class="h-6" :src="MonitSVG" />
  </section>
</template>

<i18n lang="json">
{
  "zh": {
    "title": "快速开始"
  },
  "en": {
    "title": "Quick Start"
  }
}
</i18n>
