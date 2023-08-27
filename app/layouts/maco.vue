<script setup lang="ts">
import i18n from '@/i18n'

const { locale } = i18n.global

const toggleLanguage = () => {
  locale.value = locale.value.startsWith('zh') ? 'en' : 'zh'
}
</script>

<template>
  <nav class="flex-row-between absolute z-50 px-2 py-1.5">
    <ul class="flex-row-center gap-x-0.5">
      <div class="i-ic-twotone-cancel text-red hover:text-red-500" />
      <div class="i-ic-twotone-remove-circle text-yellow hover:text-yellow-500" />
      <div class="i-ic-twotone-expand-circle-down text-green hover:text-green-500" />
    </ul>

    <ul class="flex-row-center gap-x-0.5">
      <div
        class="i-ic-twotone-swap-horizontal-circle text-teal hover:text-teal-500"
        @click="toggleLanguage"
      />
      <div class="i-ic-twotone-dark-mode text-violet hover:text-violet-500" />
      <div class="i-ic-twotone-settings text-blue hover:text-blue-500" />
    </ul>
  </nav>
</template>

<style>
.flex-row-between {
  @apply flex flex-row justify-between;
}
.flex-row-center {
  @apply flex flex-row justify-center;
}
.flex-col-center {
  @apply flex flex-col items-center justify-center;
}
</style>
