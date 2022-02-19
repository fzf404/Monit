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
  /* 禁用用户选择 */
  user-select: none;
  -webkit-user-selet: none;
  /* 允许用户拖拽 */
  -webkit-app-region: drag; 
}

svg,
span,
input,
button{
  /* 禁止拖拽 允许点击 */
  -webkit-app-region: no-drag; 
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
}

</style>
