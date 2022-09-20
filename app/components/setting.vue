<!--
 * @Author: fzf404
 * @Date: 2022-07-23 21:02:45
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-20 12:02:42
 * @Description: setting 组件
-->
<template>
  <!-- 设置模态框 -->
  <aside
    class="setting absolute z-50 inset-0 modal flex justify-center items-center rounded-lg"
    v-show="store.setting.show"
  >
    <!-- 设置框 -->
    <ul class="w-3/5 px-4 py-3 pb-2 space-y-2 ring-4 rounded-lg" :class="{ 'w-3/4': size === 'small' }">
      <!-- 设置列表 -->
      <li class="h-8 px-2 flex justify-between items-center rounded" v-for="item in setting">
        <!-- 设置标签 -->
        <!-- 选择框 -->
        <select
          class="w-3/5 px-2 py-1 outline-none border-none rounded text-xs"
          v-if="item.type === 'select'"
          v-model.lazy="config[item.id]"
        >
          <option v-for="option in item.options" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <!-- 选择框 -->
        <button class="btn btn-xs w-1/3" v-else-if="item.type === 'button'" @click="item.options.click">
          {{ item.options.text }}
        </button>
        <!-- 输入框 -->
        <input
          v-else
          :id="item.id"
          :type="item.type"
          v-model.lazy="config[item.id]"
          @keyup.enter="onSave"
          @input="
            (event) => {
              // number 最大长度
              if (item.type === 'number' && (event.target as HTMLInputElement).value.length > item.options.len)
                (event.target as HTMLInputElement).value = (event.target as HTMLInputElement).value.slice(0, item.options.len)
            }
          "
        />
      </li>
      <!-- 保存 -->
      <ol class="flex justify-end items-center">
        <button @click="onSave" class="btn btn-sm">保存</button>
      </ol>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'

import { openURL } from '#/ipc'
import { useStore } from '@/store'
import { storage } from '~/storage'

import HelpSVG from '@/assets/setting/help.svg'

// 初始化 props
interface Props {
  // 尺寸
  size?: 'small'
  // 配置
  config: Record<string, Object>
  // 信息
  setting: (
    | {
        id: string
        label: string
        type: 'text' | 'checkbox'
      }
    | {
        id: string
        label: string
        type: 'number'
        options: { len: number }
      }
    | {
        id: string
        label: string
        type: 'select'
        options: { label: string; value: string }[]
      }
    | {
        id: string
        label: string
        type: 'button'
        options: { text: string; click: () => void }
      }
  )[]
}

const props = defineProps<Props>()
const emit = defineEmits(['save'])

// 初始化 store
const store = useStore()
// 初始化 storage
const { set } = storage()

// 初始化设置
onMounted(() => {
  store.setting.has = true
})

// 保存数据
watchEffect(() => {
  for (const key in props.config) {
    set(key, props.config[key])
  }
})

// 保存
const onSave = () => {
  // 隐藏设置框
  store.setting.show = false
  // 发送保存事件
  emit('save')
}
</script>

<style scoped>
input[type='checkbox'] {
  @apply w-4 h-4 outline-none;
}

/* 去除箭头 */
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type='number'],
input[type='text'] {
  @apply w-3/5 px-2 py-1 outline-none border-none rounded text-right text-xs;
}
</style>
