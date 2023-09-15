<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import { useState } from '@/configs/state'

import MacoLayout from './maco.vue'

const { state } = useState()

const QRCode = defineAsyncComponent(() => import('@/components/qrcode.vue'))
const Loading = defineAsyncComponent(() => import('@/components/loading.vue'))
const Setting = defineAsyncComponent(() => import('@/components/setting.vue'))
</script>

<template>
  <Transition name="slide-fade">
    <MacoLayout v-show="state.navbar.show" />
  </Transition>
  <Transition name="fade">
    <QRCode v-if="state.qrcode.show" />
  </Transition>
  <Transition name="fade">
    <Loading v-if="state.loading.show" />
  </Transition>
  <Transition name="fade">
    <Setting v-if="state.setting.show" />
  </Transition>
  <Transition name="fade">
    <router-view />
  </Transition>
</template>
