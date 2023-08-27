<script setup lang="ts">
import MonitSVG from './assets/monit.svg'
</script>

<template>
  <section class="flex-col-center">
    <h1 class="text-lg text-gray-200">{{ $t('guide.title') }}</h1>
    <img class="h-6" :src="MonitSVG" />
  </section>
</template>
