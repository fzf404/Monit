<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useState } from '@/configs/state'

const { t } = useI18n()

const { state } = useState()
</script>

<template>
  <dialog class="z-30 gap-2 modal text-primary">
    <svg class="load-rotating i-ic-twotone-change-circle h-16 w-16"></svg>
    <p v-if="typeof state.loading.remark === 'string'">
      {{ state.loading.remark }}
    </p>
    <p
      v-for="(item, index) in state.loading.remark"
      v-else-if="typeof state.loading.remark === 'object'"
      :key="index"
    >
      {{ item }}
    </p>
    <p v-else>
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
