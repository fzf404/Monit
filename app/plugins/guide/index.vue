<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import MonitSVG from '@/assets/monit.svg'
import { useState } from '@/configs/state'

const { t } = useI18n()

const { state } = useState()
</script>

<template>
  <section class="flex-col-center gap-y-3 p-3 pt-6">
    <h1 class="text-lg text-white dark:text-gray-200">{{ t('title') }}</h1>
    <i18n-t
      keypath="tray"
      tag="p"
      class="flex-row-center text-sm text-gray-100 dark:text-gray-300"
    >
      <img class="inline-block h-5 px-1" :src="MonitSVG" />
    </i18n-t>
    <p class="text-xs text-gray-200 dark:text-gray-400">
      {{ t('button') }}
    </p>
    <button
      class="mt-1 rounded bg-blue p-1 opacity-80 dark:bg-purple-600 hover:opacity-100"
      @click="state.qrcode.show = true"
    >
      <svg class="i-ic-twotone-settings block h-7 w-7 bg-white"></svg>
    </button>
  </section>
</template>

<i18n lang="json">
{
  "cn": {
    "title": "快速开始",
    "tray": "右击托盘中的 {0} 图标",
    "button": "// 点击下方按钮启动插件"
  },
  "en": {
    "title": "Quick Start",
    "tray": "Right click {0} in tray",
    "button": "// Click button to start plugin"
  }
}
</i18n>
