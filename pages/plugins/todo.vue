<!--
 * @Author: fzf404
 * @Date: 2022-05-26 17:37:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-06-16 11:53:03
 * @Description: 代办事项
-->

<template lang="pug">
main
  Layout
  article.h-screen.w-screen.grid.p-4.pt-8
    ul.flex.flex-col.items-start.overflow-hidden.overflow-y-scroll
      li.flex.items-center(v-for="item in todos")
        input.h-4.w-4.m-1.mr-2(@click="remove(item.id)" type="checkbox")
        input.w-32.bg-transparent.outline-none(v-model="item.title" type="text")
      li.flex.items-center
        input.h-4.m-1.mr-2.w-4( type="checkbox")
        input.w-32.bg-transparent.outline-none( v-model="todo" @keyup.enter="add" type="text")
</template>

<!-- TODO -->
<script setup>
import Layout from '../layout/common.vue'
import { ref, reactive } from 'vue'

// 新增 todo 信息
const todo = ref('')

// 全部 todo 列表
let todos = reactive([
  {
    id: 1,
    title: '吃饭',
  },
  {
    id: 2,
    title: '睡觉',
  },
  {
    id: 3,
    title: '打豆豆',
  },
])

// 新增 todo
const add = () => {
  todos.push({
    id: todos.length,
    title: todo.value,
  })
  todo.value = ''
}
// 删除 todo
const remove = (id) => {
  setTimeout(() => {
    todos.splice(
      todos.findIndex((item) => item.id === id),
      1
    )
  }, 1000)
}
</script>

<style scoped></style>
