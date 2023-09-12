<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  show: boolean
  remark?: string | string[]
}
defineProps<Props>()

const { t } = useI18n()
</script>

<template>
  <section
    v-show="show"
    class="absolute z-30 h-full w-full flex-col-center gap-2 rounded-lg bg-gray-300 bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-50"
  >
    <svg
      class="load-rotating i-ic-twotone-change-circle h-16 w-16 text-white dark:text-gray-300"
    ></svg>
    <p
      v-if="typeof remark === 'string'"
      class="font-mono text-white dark:text-gray-200"
    >
      {{ remark }}
    </p>
    <p
      v-for="(item, index) in remark"
      v-else-if="typeof remark === 'object'"
      :key="index"
      class="font-intro"
    >
      {{ item }}
    </p>
    <p v-else class="font-mono text-white dark:text-gray-200">
      {{ t('loading') }}
    </p>
  </section>
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
