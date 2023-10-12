<script setup lang="ts">
import { useState } from '@/hooks/state'

const { state } = useState()

const closePlugin = () => {
  window.api?.invoke('set-plugin-close')
}

const minimizePlugin = () => {
  window.api?.invoke('set-plugin-minimize')
}

const toggleSticky = () => {
  state.sticky = !state.sticky
}

const dragNavbar = () => {
  state.navbar.dragging = true
}

const toggleNavbar = () => {
  state.navbar.sticky = !state.navbar.sticky
}

const toggleTheme = () => {
  console.log(state.theme)
  state.theme = state.theme === 'dark' ? 'light' : 'dark'
}

const toggleSetting = () => {
  state.setting && (state.setting.show = !state.setting.show)
}
</script>

<template>
  <nav class="nav z-50 gap-x-2 px-2 py-1.5">
    <ul class="flex-row-left gap-x-0.5">
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
          'rotate-180': state.sticky,
        }"
        @click="toggleSticky"
      ></svg>
    </ul>
    <ul
      class="h-4 flex-auto cursor-pointer rounded bg-white opacity-0 hover:opacity-20"
      :class="{
        'opacity-20': state.navbar.dragging,
      }"
      @mousedown="dragNavbar"
    ></ul>
    <ul class="flex-row-right gap-x-0.5">
      <svg
        class="text-teal"
        :class="{
          'hover:text-teal-300': state.theme === 'light',
          'hover:text-teal-500': state.theme === 'dark',
          'i-ic-twotone-push-pin': state.navbar.sticky,
          'i-ic-twotone-pin-off': !state.navbar.sticky,
        }"
        @click="toggleNavbar"
      ></svg>
      <svg
        :class="{
          'i-ic-twotone-light-mode text-orange hover:text-orange-300':
            state.theme === 'light',
          'i-ic-twotone-dark-mode text-violet hover:text-violet-500':
            state.theme === 'dark',
        }"
        @click="toggleTheme"
      ></svg>
      <svg
        class="i-ic-twotone-settings text-blue"
        :class="{
          'hover:text-blue-300': state.theme === 'light',
          'hover:text-blue-500': state.theme === 'dark',
          'hover:cursor-not-allowed!': !state.setting,
        }"
        @click="toggleSetting"
      ></svg>
    </ul>
  </nav>
</template>
