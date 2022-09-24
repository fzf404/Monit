<template>
  <article v-show="show">
    <img class="absolute w-full h-full z-50 modal object-contain pt-3 pb-12" :src="image" alt="图像" />
    <p class="absolute w-full z-50 text-center bottom-3 bg-theme text-lg">{{ remark }}</p>
  </article>
</template>

<script setup>
const props = defineProps(['show', 'image', 'remark'])
</script>
