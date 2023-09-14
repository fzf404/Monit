<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useImage } from '@vueuse/core'

import { useState } from '@/configs/state'

const { t } = useI18n()

const state = useState()

const { isLoading, error } = useImage({ src: state.qrcode.url! })
</script>

<template>
  <dialog class="z-30 gap-2 text-white dialog dark:text-gray-200">
    <p v-if="isLoading" class="z-30 gap-2 dialog">
      {{ t('loading') }}
    </p>

    <p v-else-if="error" class="drop-shadow">{{ t('error') }}</p>

    <img v-else :src="state.qrcode.url" class="mb-2 h-2/3" />

    <footer
      class="absolute bottom-0 w-full bg-sky p-1 text-center dark:bg-purple-600"
    >
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
