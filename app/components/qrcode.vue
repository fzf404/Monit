<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useImage } from '@vueuse/core'

import { useState } from '@/utils/state'

const { t } = useI18n()

const state = useState()

const { isLoading, error } = useImage({ src: state.qrcode.url! })
</script>

<template>
  <dialog
    class="flex-col-center gap-2 bg-gray-300 bg-opacity-30 text-white dark:bg-gray-900 dark:bg-opacity-50"
  >
    <p v-if="isLoading">
      {{ t('loading') }}
    </p>

    <p v-else-if="error">{{ t('error') }}</p>

    <img v-else :src="state.qrcode.url" class="mb-2 h-2/3" />

    <footer class="absolute bottom-0 w-full bg-purple p-1 text-center">
      <slot>
        {{ t('qrcode') }}
      </slot>
    </footer>
  </dialog>
</template>

<i18n lang="json">
{
  "cn": {
    "loading": "加载中……",
    "error": "加载失败",
    "qrcode": "请扫描二维码"
  },
  "en": {
    "loading": "Loading...",
    "error": "Load Failed",
    "qrcode": "Please scan QR code"
  }
}
</i18n>
