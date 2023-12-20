<script setup lang="ts">
import { useControl } from '@/hooks/control'
import { useLayout } from '@/hooks/layout'
import { closePlugin, minimizePlugin } from '@/utils/plugin'

const { layout } = useLayout()
const { control } = useControl()
</script>

<template>
  <nav
    v-show="control.show"
    class="absolute z-50 w-full flex-row-between gap-x-2 px-2 py-1.5"
  >
    <ul class="flex-row-left gap-x-0.5">
      <svg
        class="i-ic-twotone-cancel text-red"
        :class="{
          'hover:text-red-300': control.theme === 'sun',
          'hover:text-red-500': control.theme === 'moon',
        }"
        @click="closePlugin"
      ></svg>
      <svg
        class="i-ic-twotone-remove-circle text-yellow"
        :class="{
          'hover:text-yellow-300': control.theme === 'sun',
          'hover:text-yellow-500': control.theme === 'moon',
        }"
        @click="minimizePlugin"
      ></svg>
      <svg
        class="i-ic-twotone-expand-circle-down text-green"
        :class="{
          'hover:text-green-300': control.theme === 'sun',
          'hover:text-green-500': control.theme === 'moon',
          'rotate-180': control.top,
        }"
        @click="control.top = !control.top"
      ></svg>
    </ul>
    <ul
      class="h-4 flex-auto cursor-pointer rounded bg-white opacity-0 hover:opacity-20"
      :class="{
        'opacity-20': control.dragging,
      }"
      @mousedown="control.dragging = true"
    ></ul>
    <ul class="flex-row-right gap-x-0.5">
      <svg
        class="text-teal"
        :class="{
          'hover:text-teal-300': control.theme === 'sun',
          'hover:text-teal-500': control.theme === 'moon',
          'i-ic-twotone-lock': control.lock,
          'i-ic-twotone-lock-open': !control.lock,
        }"
        @click="control.lock = !control.lock"
      ></svg>
      <svg
        :class="{
          'i-ic-twotone-light-mode text-orange hover:text-orange-300':
            control.theme === 'sun',
          'i-ic-twotone-dark-mode text-violet hover:text-violet-500':
            control.theme === 'moon',
        }"
        @click="control.theme = control.theme === 'moon' ? 'sun' : 'moon'"
      ></svg>
      <svg
        class="i-ic-twotone-settings text-blue"
        :class="{
          'hover:text-blue-300': control.theme === 'sun',
          'hover:text-blue-500': control.theme === 'moon',
          'hover:cursor-not-allowed!': !layout.setting,
        }"
        @click="layout.setting && (control.setting = !control.setting)"
      ></svg>
    </ul>
  </nav>
</template>
