<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import { useState } from '@/hooks/state'

import MacoLayout from './maco.vue'

const { state } = useState()

const QRCode = defineAsyncComponent(() => import('@/components/qrcode.vue'))
const Loading = defineAsyncComponent(() => import('@/components/loading.vue'))
const Setting = defineAsyncComponent(() => import('@/components/setting.vue'))
</script>

<template>
  <Transition name="slide-fade">
    <MacoLayout v-show="state.navbar.sticky || state.navbar.show" />
  </Transition>
  <Transition name="fade">
    <QRCode v-if="state.qrcode" v-show="state.qrcode.show" />
  </Transition>
  <Transition name="fade">
    <Loading v-if="state.loading" v-show="state.loading.show" />
  </Transition>
  <Transition name="fade">
    <Setting v-if="state.setting" v-show="state.setting.show" />
  </Transition>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition name="fade">
        <Suspense>
          <component :is="Component" />
          <template #fallback>
            <Loading />
          </template>
        </Suspense>
      </Transition>
    </template>
  </RouterView>
</template>
