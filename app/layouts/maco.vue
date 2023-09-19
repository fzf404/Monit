<script setup lang="ts">
import { useState } from '@/configs/state'

const { state, action } = useState()

const closePlugin = () => {
  window.api?.invoke('set-plugin-close')
}

const minimizePlugin = () => {
  window.api?.invoke('set-plugin-minimize')
}

const toggleSticky = () => {
  action.toggleSticky()
}

const dragNavbar = () => {
  action.setNavbarDragging(true)
}

const toggleNavbar = () => {
  action.toggleNavbar()
}

const toggleTheme = () => {
  action.toggleTheme()
}

const toggleSetting = () => {
  state.setting.data && action.toggleSetting()
}
</script>

<template>
  <nav class="nav z-50 gap-x-2 px-2 py-1.5">
    <ul class="flex-row-left gap-x-0.5">
      <svg
        class="i-ic-twotone-cancel text-red"
        :class="{
          'hover:text-red-300': state.theme === 'sun',
          'hover:text-red-500': state.theme === 'moon',
        }"
        @click="closePlugin"
      ></svg>
      <svg
        class="i-ic-twotone-remove-circle text-yellow"
        :class="{
          'hover:text-yellow-300': state.theme === 'sun',
          'hover:text-yellow-500': state.theme === 'moon',
        }"
        @click="minimizePlugin"
      ></svg>
      <svg
        class="i-ic-twotone-expand-circle-down text-green"
        :class="{
          'hover:text-green-300': state.theme === 'sun',
          'hover:text-green-500': state.theme === 'moon',
          'rotate-180': state.sticky,
        }"
        @click="toggleSticky"
      ></svg>
    </ul>
    <ul
      class="flex-auto cursor-pointer rounded bg-white opacity-0 hover:opacity-20"
      :class="{
        'opacity-20': state.navbar.dragging,
      }"
      @mousedown="dragNavbar"
    ></ul>
    <ul class="flex-row-right gap-x-0.5">
      <svg
        class="text-teal"
        :class="{
          'hover:text-teal-300': state.theme === 'sun',
          'hover:text-teal-500': state.theme === 'moon',
          'i-ic-twotone-push-pin': state.navbar.sticky,
          'i-ic-twotone-pin-off': !state.navbar.sticky,
        }"
        @click="toggleNavbar"
      ></svg>
      <svg
        :class="{
          'i-ic-twotone-light-mode text-orange hover:text-orange-300':
            state.theme === 'sun',
          'i-ic-twotone-dark-mode text-violet hover:text-violet-500':
            state.theme === 'moon',
        }"
        @click="toggleTheme"
      ></svg>
      <svg
        class="i-ic-twotone-settings text-blue"
        :class="{
          'hover:text-blue-300': state.theme === 'sun',
          'hover:text-blue-500': state.theme === 'moon',
          'hover:cursor-not-allowed!': !state.setting.data,
        }"
        @click="toggleSetting"
      ></svg>
    </ul>
  </nav>
</template>
