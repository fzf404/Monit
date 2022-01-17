<template>
  <Index msg="Welcome to Your Vue.js App"/>
</template>

<script>
import Index from './components/Index.vue'

export default {
  name: 'App',
  components: {
    Index
  }
}
</script>

<style>
body {
  background-color: rgba(0, 0, 0, 0.3);
  /* 禁用用户选择 */
  user-select: none;
  -webkit-user-selet: none;
  /* -moz-user-select: none; */
  /* 允许用户拖拽 */
  -webkit-app-region: drag; 
}
</style>
