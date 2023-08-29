<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import '@/themes/dark.scss'

const { locale } = useI18n()

const toggleLanguage = () => {
  locale.value = locale.value.startsWith('zh') ? 'en' : 'zh'
}

onMounted(() => {
  document.documentElement.dataset.theme = 'dark'
})
</script>

<template>
  <nav class="flex-row-between absolute z-50 px-2 py-1.5">
    <ul class="flex-row-center gap-x-0.5">
      <svg class="i-ic-twotone-cancel text-red hover:text-red-500"></svg>
      <svg class="i-ic-twotone-remove-circle text-yellow hover:text-yellow-500"></svg>
      <svg class="i-ic-twotone-expand-circle-down text-green hover:text-green-500"></svg>
    </ul>
    <ul class="flex-row-center gap-x-0.5">
      <svg
        class="i-ic-twotone-swap-horizontal-circle text-teal hover:text-teal-500"
        @click="toggleLanguage"
      ></svg>
      <svg class="i-ic-twotone-dark-mode text-violet hover:text-violet-500"></svg>
      <svg class="i-ic-twotone-settings text-blue hover:text-blue-500"></svg>
    </ul>
  </nav>
</template>
