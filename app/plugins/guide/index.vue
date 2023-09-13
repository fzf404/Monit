<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import MonitSVG from '@/assets/monit.svg'
import Loading from '@/components/qrcode.vue'

const { t } = useI18n()
</script>

<template>
  <Loading :show="true" image="https://img.fzf404.art/monit/qrcode.webp">
    <p>123</p>
  </Loading>
  <section class="flex-col-center gap-y-3 p-4 pt-9">
    <h1 class="text-lg text-gray-200">{{ t('title') }}</h1>
    <i18n-t
      keypath="tray"
      tag="p"
      class="flex-row-center text-sm text-gray-300"
    >
      <img class="inline-block h-5 px-1" :src="MonitSVG" />
    </i18n-t>
    <p class="text-sm text-gray-400">
      {{ t('button') }}
    </p>
    <button
      class="rounded bg-purple p-1 opacity-80 dark:bg-purple-600 hover:opacity-100"
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
    "button": "// Click button start plugin"
  }
}
</i18n>
