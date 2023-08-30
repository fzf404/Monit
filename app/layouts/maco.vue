<script setup lang="ts">
import { onMounted, ref } from 'vue'

import i18n from '@/configs/i18n'
import { useState } from '@/configs/state'

import '@/themes/dark.scss'

const state = useState()

i18n.global.locale.value = state.locale

const closePlugin = () => {
  window.api.invoke('plugin-close')
}

const minimizePlugin = () => {
  window.api.invoke('plugin-minimize')
}

const stickyPlugin = async () => {
  const state = !(await window.api.invoke('plugin-top'))
  window.api.invoke('plugin-sticky', state)
}

onMounted(() => {
  document.documentElement.dataset.theme = state.theme

  document.addEventListener('mousemove', function (event) {
    state.navbar.show = event.clientY < 32 ? true : false
  })
})
</script>

<template>
  <nav class="flex-row-between absolute z-50 gap-x-2 px-2 py-1.5">
    <Transition name="fade">
      <ul v-show="state.navbar.show" class="flex-row-center gap-x-0.5">
        <svg
          class="i-ic-twotone-cancel text-red hover:text-red-500"
          @click="closePlugin"
        ></svg>
        <svg
          class="i-ic-twotone-remove-circle text-yellow hover:text-yellow-500"
          @click="minimizePlugin"
        ></svg>
        <svg
          class="i-ic-twotone-expand-circle-down text-green hover:text-green-500"
          @click="stickyPlugin"
        ></svg>
      </ul>
    </Transition>
    <Transition v-show="state.navbar.show" name="fade">
      <ul class="flex-auto rounded bg-white opacity-10"></ul>
    </Transition>
    <Transition v-show="state.navbar.show" name="fade">
      <ul class="flex-row-center gap-x-0.5">
        <svg
          class="i-ic-twotone-swap-horizontal-circle text-teal hover:text-teal-500"
          @click="state.toggleLocale"
        ></svg>
        <svg
          v-if="state.theme === 'dark'"
          class="i-ic-twotone-dark-mode text-violet hover:text-violet-500"
          @click="state.toggleTheme"
        ></svg>
        <svg
          v-if="state.theme === 'light'"
          class="i-ic-twotone-light-mode text-violet hover:text-violet-500"
          @click="state.toggleTheme"
        ></svg>
        <svg
          class="i-ic-twotone-settings text-blue hover:text-blue-500"
          @click="state.toggleSetting"
        ></svg>
      </ul>
    </Transition>
  </nav>
</template>

<style lang="scss">
nav {
  ul {
    -webkit-app-region: no-drag;
  }

  ul:nth-child(2) {
    -webkit-app-region: drag;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(-2rem);
  opacity: 0;
}
</style>
