<!--
 * @Author: fzf404
 * @Date: 2022-05-26 17:37:12
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-11-01 11:16:04
 * @Description: todo 代办事项管理
-->
<template lang="pug">
main
  article.flex-col-between.pt-8.pb-3.px-4
    draggable.scrollable( class="space-y-1 " tag="ul" handle=".handle" item-key="id" :list="store.todos" :animation="200")
      template(#item="{element,index}")
        li.h-5.flex-row-between
          input.mr-2.accent-purple-500(v-model="element.checked" type="checkbox")
          input.mr-2.w-full.bg-transparent.outline-none.text-sm(:class="element.checked ? 'line-through text-gray' : 'text-gray-200'" v-model="element.title" type="text")
          DeleteSVG.w-6.btn-svg.text-rose-400(class="hover:text-rose-500" @click="remove(index)" )
          MoveSVG.w-7.btn-svg.text-purple-400.handle(class="hover:text-purple-500")
    footer.flex-row-between.border-t-2.border-indigo-500.pt-2
      input.mr-2.accent-purple-500( type="checkbox")
      input.mr-2.w-full.bg-transparent.outline-none.text-sm( v-model="todo" @keyup.enter="add" type="text")
      AddSVG.w-5.mr-2.btn-svg.text-cyan-400(class=" hover:text-cyan-500 " @click="add")
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'

import { storage } from '~/storage'

import AddSVG from '@/assets/todo/add.svg'
import DeleteSVG from '@/assets/todo/delete.svg'
import MoveSVG from '@/assets/todo/move.svg'

// 新增 todo 信息
const todo = ref('')

// 存储数据
const store = storage({
  todos: [
    { title: '吃饭', checked: false },
    { title: '睡觉', checked: false },
    { title: '写代码', checked: true },
  ],
})

// 新增 todo
const add = () => {
  store.todos.push({
    title: todo.value,
    checked: false,
  })
  todo.value = ''
}

// 删除 todo
const remove = (index) => {
  store.todos.splice(index, 1)
}
</script>
