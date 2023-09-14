<script setup lang="ts">
import { useState } from '@/configs/state'

const state = useState()

const [width] = await window.api.invoke('plugin-size')
</script>

<template>
  <menu class="z-40 menu">
    <ul
      class="bg-gray-200 ring-blue-400 ring-opacity-50"
      :class="{
        'w-3/4': width < 300,
        'w-3/5': width >= 300 && width <= 600,
        'w-3/6': width > 600,
      }"
    >
      <li
        v-for="(item, index) in state.setting.data"
        :key="index"
        class="h-8 flex-row-between rounded px-2"
      >
        <label :for="item.label" class="flex gap-1 text-xs">
          {{ item }}
        </label>
      </li>
    </ul>
  </menu>
</template>
