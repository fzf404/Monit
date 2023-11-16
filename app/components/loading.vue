<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  show: boolean
  message: {
    cn: string | string[]
    en: string | string[]
  }
}

withDefaults(defineProps<Props>(), {
  show: true,
  message: () => {
    return {
      cn: '加载中',
      en: 'Loading...',
    }
  },
})

const { locale } = useI18n()
</script>

<template>
  <Transition v-show="show" name="fade">
    <dialog class="z-30 gap-y-2 modal text-primary">
      <svg class="load-rotating i-ic-twotone-change-circle h-16 w-16"></svg>
      <p v-if="typeof message[locale] === 'string'">
        {{ message[locale] }}
      </p>
      <p
        v-for="(item, index) in message[locale]"
        v-else-if="typeof message[locale] === 'object'"
        :key="index"
      >
        {{ item }}
      </p>
    </dialog>
  </Transition>
</template>
