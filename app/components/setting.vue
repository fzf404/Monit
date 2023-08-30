<script setup lang="ts">
import { useState } from '@/configs/state'

const pinia = useState()
</script>

<template>
  <Transition name="fade">
    <menu v-if="pinia.setting.exist"></menu>
  </Transition>
</template>
