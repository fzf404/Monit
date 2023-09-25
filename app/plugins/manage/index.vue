<script setup lang="ts">
const openPlugin = (name: string) => {
  window.api?.invoke('open-plugin', name)
}
</script>

<template>
  <button @click="openPlugin('guide')"></button>
</template>
