<!--
 * @Author: fzf404
 * @Date: 2022-05-26 17:37:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-06-19 23:54:29
 * @Description: 代办事项
-->

<template lang="pug">
main
  Layout
  article.h-screen.grid.p-4.pt-8
    ul.flex.flex-col.items-start.space-y-1.overflow-hidden.overflow-y-scroll
      li.flex.items-center(v-for="(item,index) in todos")
        input.h-4.w-4.m-1.mr-2.accent-purple-500(v-model="item.checked" type="checkbox")
        input.w-28.bg-transparent.outline-none(:class="item.checked?'line-through text-gray-500':'text-gray-200'" v-model="item.title" type="text")
        button.btn-xs.bg-red-500(@click="remove(index)") ×
      li.flex.items-center
        input.h-4.m-1.mr-2.w-4.accent-purple-500(checked type="checkbox")
        input.w-32.bg-transparent.outline-none( v-model="todo" @keyup.enter="add" type="text")
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { cget, cset } from '../../common/utils/storage'
import Layout from '../layout/custom.vue'

// 信息获取
const get = (key, def) => {
  return cget('todo', key, def)
}

// 信息保存
const set = (key, value) => {
  return cset('todo', key, value)
}

// 新增 todo 信息
const todo = ref('')

// 全部 todo 列表
const todos = reactive(get('todos', []))

// 计算 todo 长度, 作为新 todo 的 id
const number = ref(todos.length)

// 监听 todos 修改
watch(todos, (val) => {
  // 保存数据
  set('todos', val)
})

// 新增 todo
const add = () => {
  number.value++
  todos.push({
    id: number.value,
    title: todo.value,
    checked: false,
  })
  todo.value = ''
}
// 删除 todo
const remove = (index) => {
  todos.splice(index, 1)
}
</script>

<style scoped></style>
