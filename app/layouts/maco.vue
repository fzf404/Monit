<script setup lang="ts">
import i18n from '@/configs/i18n'
import { useState } from '@/configs/state'

import '@/themes/dark.scss'

const state = useState()

i18n.global.locale.value = state.locale

document.documentElement.dataset.theme = state.theme

document.addEventListener('mousemove', function (event) {
  state.navbar.show = event.clientY < 32 ? true : false
})

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
</script>

<template>
  <nav class="flex-row-between absolute z-50 gap-x-2 px-2 py-1.5">
    <Transition
      v-show="state.navbar.sticky || state.navbar.show"
      name="slide-fade"
    >
      <ul class="flex-row-center gap-x-0.5">
        <svg
          class="i-ic-twotone-cancel text-red"
          :class="{
            'hover:text-red-300': state.theme === 'light',
            'hover:text-red-500': state.theme === 'dark',
          }"
          @click="closePlugin"
        ></svg>
        <svg
          class="i-ic-twotone-remove-circle text-yellow"
          :class="{
            'hover:text-yellow-300': state.theme === 'light',
            'hover:text-yellow-500': state.theme === 'dark',
          }"
          @click="minimizePlugin"
        ></svg>
        <svg
          class="i-ic-twotone-expand-circle-down text-green"
          :class="{
            'hover:text-green-300': state.theme === 'light',
            'hover:text-green-500': state.theme === 'dark',
          }"
          @click="stickyPlugin"
        ></svg>
      </ul>
    </Transition>
    <Transition
      v-show="state.navbar.show"
      :name="state.navbar.sticky ? 'fade' : 'slide-fade'"
    >
      <ul
        class="draggable flex-auto rounded bg-white opacity-20 hover:cursor-pointer"
      ></ul>
    </Transition>
    <Transition
      v-show="state.navbar.sticky || state.navbar.show"
      name="slide-fade"
    >
      <ul class="flex-row-center gap-x-0.5">
        <svg
          class="i-ic-twotone-swap-horizontal-circle text-teal"
          :class="{
            'hover:text-teal-300': state.theme === 'light',
            'hover:text-teal-500': state.theme === 'dark',
          }"
          @click="state.toggleLocale"
        ></svg>
        <svg
          :class="
            state.theme === 'dark'
              ? 'i-ic-twotone-dark-mode text-violet hover:text-violet-500'
              : 'i-ic-twotone-light-mode text-orange hover:text-orange-300'
          "
          @click="state.toggleTheme"
        ></svg>
        <svg
          class="i-ic-twotone-settings text-blue"
          :class="{
            'hover:text-blue-300': state.theme === 'light',
            'hover:text-blue-500': state.theme === 'dark',
          }"
          @click="state.toggleSetting"
        ></svg>
      </ul>
    </Transition>
  </nav>
</template>

<style lang="scss">
.draggable {
  -webkit-app-region: drag;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0 !important;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-2rem);
  opacity: 0 !important;
}
</style>
