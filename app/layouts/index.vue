<script setup lang="ts">
import { initWatch } from '@/configs/watch'

import { useState } from '../configs/state'
import MacoLayout from './maco.vue'

const state = useState()

initWatch(state)
</script>

<template>
  <Transition v-show="state.navbar.show" name="slide-fade">
    <MacoLayout class="w-screen" />
  </Transition>
  <router-view class="h-screen" />
</template>
