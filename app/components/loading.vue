<script setup lang="ts">
interface Props {
  show: boolean
  remark?: string | string[]
}

withDefaults(defineProps<Props>(), {
  remark: '加载中...',
})
</script>

<template>
  <section
    v-show="show"
    class="absolute z-30 h-full w-full flex-col-center gap-2 rounded-lg bg-gray-300 bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-50"
  >
    <svg
      class="load-rotating i-ic-twotone-change-circle h-16 w-16 text-white dark:text-gray-300"
    ></svg>
    <p
      v-if="typeof remark === 'string'"
      class="font-mono text-white dark:text-gray-300"
    >
      {{ remark }}
    </p>
    <p v-for="(item, index) in remark" v-else :key="index" class="font-intro">
      {{ item }}
    </p>
  </section>
</template>
