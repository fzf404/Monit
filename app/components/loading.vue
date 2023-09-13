<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useState } from '@/utils/state'

const { t } = useI18n()

const state = useState()
</script>

<template>
  <dialog
    class="flex-col-center gap-2 bg-gray-300 bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-50"
  >
    <svg
      class="load-rotating i-ic-twotone-change-circle h-16 w-16 text-white dark:text-gray-300"
    ></svg>
    <p
      v-if="state.qrcode.remark === 'string'"
      class="font-mono text-white dark:text-gray-200"
    >
      {{ state.qrcode.remark }}
    </p>
    <p
      v-for="(item, index) in state.qrcode.remark"
      v-else-if="typeof state.qrcode.remark === 'object'"
      :key="index"
      class="font-intro"
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
