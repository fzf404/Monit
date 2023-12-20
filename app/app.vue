<script setup lang="ts">
import { useLayout } from '@/hooks/layout'
import Control from '@/layouts/control.vue'
import Setting from '@/layouts/setting.vue'

const { layout } = useLayout()
</script>

<template>
  <Transition name="slide-fade">
    <Control v-if="layout.control" />
  </Transition>
  <Transition name="fade">
    <Setting v-if="layout.setting" />
  </Transition>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition name="fade">
        <Suspense>
          <Component :is="Component" />
        </Suspense>
      </Transition>
    </template>
  </RouterView>
</template>
