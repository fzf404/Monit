<!--
 * @Author: fzf404
 * @Date: 2022-05-26 17:37:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-15 15:23:23
 * @Description: 代办事项
-->

<template lang="pug">
main
  Layout
  article.h-screen.p-4.pt-7
    draggable.flex.flex-col.items-start.h-56.overflow-hidden.overflow-y-scroll( tag="ul" :list="todos" handle=".handle" :animation="200" item-key="id")
      template(#item="{element,index}")
        li.flex.items-center(class="space-y-1")
          input.h-4.w-4.mr-2.list-item.accent-purple-500(v-model="element.checked" type="checkbox")
          input.w-28.bg-transparent.outline-none.text-sm(:class="element.checked?'line-through text-gray-500':'text-gray-200'" v-model="element.title" type="text")
          DeleteSVG.w-4.stroke-current.clickable.text-rose-400(class="hover:text-rose-500" @click="remove(index)" )
          MoveSVG.w-5.stroke-current.clickable.text-purple-400.handle(class="hover:text-purple-500")
    footer.flex.items-center.pt-2.border-t-2.border-indigo-500
      input.h-4.w-4.accent-purple-500.mr-2( type="checkbox")
      input.w-24.bg-transparent.outline-none.mr-5.text-sm( v-model="todo" @keyup.enter="add" type="text")
      AddSVG.w-4.stroke-current.clickable.text-cyan-400(class="hover:text-cyan-500" @click="add")
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { storage } from '../../custom/storage'
import DeleteSVG from '../assets/todo/delete.svg'
import MoveSVG from '../assets/todo/move.svg'
import AddSVG from '../assets/todo/add.svg'
import Layout from '../layout/custom.vue'

const { set, get } = storage('todo')

// 新增 todo 信息
const todo = ref('')

// 全部 todo 列表
const todos = reactive(
  get('todos', [
    { title: '吃饭', checked: false },
    { title: '睡觉', checked: false },
    { title: '写代码', checked: true },
  ])
)

// 监听 todos 修改
watch(todos, (val) => {
  // 保存数据
  set('todos', val)
})

// 新增 todo
const add = () => {
  todos.push({
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
