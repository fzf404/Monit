<script setup lang="ts">
import { useState } from '@/configs/state'
import { initWatch } from '@/configs/watch'
import Layout from '@/layouts/index.vue'

initWatch(useState())
</script>

<template>
  <Layout />
</template>
