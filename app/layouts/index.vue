<script setup lang="ts">
import MacoLayout from './maco.vue'
</script>

<template>
  <MacoLayout class="w-screen" />
  <router-view class="h-screen" />
</template>

<style lang="scss">
#app {
  -webkit-app-region: drag;
  @apply select-none;

  * {
    @apply transition;
  }

  img {
    -webkit-user-drag: none;
  }

  svg,
  input,
  select,
  button {
    -webkit-app-region: no-drag;
    @apply cursor-pointer;
  }
}
</style>
