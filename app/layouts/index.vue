<script setup lang="ts">
import MacoLayout from './maco.vue'
</script>

<template>
  <MacoLayout class="w-screen" />
  <router-view class="h-screen" />
</template>

<style lang="scss">
#app {
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
    @apply cursor-pointer;
  }
}
</style>
