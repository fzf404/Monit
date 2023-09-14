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
  <MacoLayout />
  <QRCode v-if="state.qrcode.show" />
  <Loading v-if="state.loading.show" />
  <Setting v-if="state.setting.show" />
  <router-view />
</template>
