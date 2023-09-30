<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import MonitSVG from '@/assets/monit.svg'

const { t } = useI18n()
const router = useRouter()

const openManagePlugin = () => {
  window.api?.invoke('open-plugin', 'manage') ?? router.push({ name: 'manage' })
}
</script>

<template>
  <section class="flex-col-center gap-y-2.5 p-3 pt-6">
    <h1 class="text-lg moon:text-gray-200 sun:text-white">
      {{ t('title') }}
    </h1>
    <i18n-t
      keypath="tray"
      tag="p"
      class="flex-row-center text-sm moon:text-gray-300 sun:text-gray-100"
    >
      <img class="inline-block h-5 px-1" :src="MonitSVG" />
    </i18n-t>
    <p class="text-xs moon:text-gray-400 sun:text-gray-200">
      {{ t('button') }}
    </p>
    <button
      class="mt-1 rounded p-1 opacity-80 moon:bg-purple-600 sun:bg-blue hover:opacity-100"
      @click="openManagePlugin"
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
    "button": "// 点击下方按钮管理插件"
  },
  "en": {
    "title": "Quick Start",
    "tray": "Right click {0} in tray",
    "button": "// Click icon to manage plugin"
  }
}
</i18n>
