<script setup lang="ts">
import { UseImage } from '@vueuse/components'
import { useI18n } from 'vue-i18n'

interface Props {
  url: string
  show: boolean
  message: {
    cn: string
    en: string
  }
}

withDefaults(defineProps<Props>(), {
  show: true,
  url: 'https://img.fzf404.art/monit/qrcode.webp',
  message: () => {
    return {
      cn: '请扫描二维码',
      en: 'Please scan QR code',
    }
  },
})

const { t, locale } = useI18n()
</script>

<template>
  <Transition name="fade">
    <dialog v-show="show" class="z-30 gap-y-2 modal text-primary">
      <UseImage :src="url">
        <template #default>
          <img :src="url" class="mb-2 h-2/3" />
        </template>
        <template #loading>
          <p class="z-30 gap-2">
            {{ t('loading') }}
          </p>
        </template>
        <template #error>
          <p>{{ t('error') }}</p>
        </template>
      </UseImage>
      <footer class="absolute bottom-0 w-full p-1 text-center bg-theme">
        <span>
          {{ message[locale] }}
        </span>
      </footer>
    </dialog>
  </Transition>
</template>

<i18n lang="json">
{
  "cn": {
    "loading": "加载中……",
    "error": "加载失败"
  },
  "en": {
    "loading": "Loading...",
    "error": "Load Failed"
  }
}
</i18n>
