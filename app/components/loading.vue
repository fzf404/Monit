<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useState } from '@/configs/state'

const { t } = useI18n()

const { state } = useState()
</script>

<template>
  <dialog class="z-30 gap-2 dialog">
    <svg
      class="load-rotating i-ic-twotone-change-circle h-16 w-16 text-white dark:text-gray-300"
    ></svg>
    <p
      v-if="typeof state.loading.remark === 'string'"
      class="font-mono text-white dark:text-gray-200"
    >
      {{ state.loading.remark }}
    </p>
    <p
      v-for="(item, index) in state.loading.remark"
      v-else-if="typeof state.loading.remark === 'object'"
      :key="index"
      class="font-mono text-white dark:text-gray-200"
    >
      {{ item }}
    </p>
    <p v-else class="font-mono text-white dark:text-gray-200">
      {{ t('loading') }}
    </p>
  </dialog>
</template>

<i18n lang="json">
{
  "cn": {
    "loading": "加载中..."
  },
  "en": {
    "loading": "Loading..."
  }
}
</i18n>
