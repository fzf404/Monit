<script setup lang="ts">
import { useState } from '@/configs/state'

const pinia = useState()
</script>

<template>
  <Transition name="fade" mode="out-in">
    <menu v-if="pinia.setting.exist"></menu>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
