<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { UseImage } from '@vueuse/components'

const { t } = useI18n()

interface Props {
  show: boolean
  image: string
  remark: string
}

defineProps<Props>()
</script>

<template>
  <dialog v-show="show" class="flex-col-center z-30 gap-2">
    <UseImage :src="image">
      <template #loading>
        {{ t('loading') }}
      </template>
      <template #error>
        {{ t('error') }}
      </template>
    </UseImage>
  </dialog>
</template>

<i18n lang="json">
{
  "zh": {
    "loading": "加载中……",
    "error": "加载失败"
  },
  "en": {
    "loading": "Loading...",
    "error": "Load Failed"
  }
}
</i18n>
