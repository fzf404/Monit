<script setup lang="ts">
import { useState } from '@/configs/state'

const { state } = useState()

const size = await window.api.invoke('plugin-size')
</script>

<template>
  <menu class="z-40 menu">
    <ul
      class="bg-gray-200 ring-blue-400 ring-opacity-50"
      :class="{
        'w-3/4': size.width < 300,
        'w-3/5': size.width >= 300 && size.width <= 600,
        'w-3/6': size.width > 600,
      }"
    >
      <li
        v-for="(item, index) in state.setting.data"
        :key="index"
        class="h-8 flex-row-between rounded px-2"
      >
        <label :for="item.label" class="flex-1 text-xs">
          <span>
            {{ item }}
          </span>
        </label>
      </li>
    </ul>
  </menu>
</template>
