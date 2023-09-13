<script setup lang="ts">
import { useState } from '@/utils/state'

const state = useState()
</script>

<template>
  <Transition name="fade">
    <menu></menu>
  </Transition>
</template>
