<script setup lang="ts">
import MacoLayout from './maco.vue'
</script>

<template>
  <MacoLayout class="w-screen" />
  <router-view class="h-screen" />
</template>

<style>
.flex-row-between {
  @apply flex flex-row justify-between;
}
</style>
