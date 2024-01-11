<script setup lang="ts">
import { reactive } from 'vue'

import Loading from '@/components/loading.vue'

const state = reactive({
  loading: true,
})
</script>

<template>
  <Loading :show="state.loading"></Loading>
  <section class="screen flex-col-center p-3 pt-6"></section>
</template>
