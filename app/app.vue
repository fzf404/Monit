<script setup lang="ts">
import Layout from '@/layouts/index.vue'
import { useState } from '@/utils/state'
import { initWatch } from '@/utils/watch'

initWatch(useState())
</script>

<template>
  <Layout />
</template>
