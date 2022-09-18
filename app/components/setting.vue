<!--
 * @Author: fzf404
 * @Date: 2022-07-23 21:02:45
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-18 15:08:14
 * @Description: setting 组件
-->
<template>
  <!-- 设置模态框 -->
  <aside class="setting" :class="{ 'setting-sm': size === 'small' }" v-show="store.setting.show">
    <!-- 设置框 -->
    <ul>
      <!-- 设置列表 -->
      <li v-for="item in setting">
        <!-- 设置标签 -->
        <label :for="item.id">{{ item.label }}</label>
        <!-- 选择框 -->
        <select v-if="item.type === 'select'" v-model.lazy="config[item.id]">
          <option v-for="option in item.options" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <!-- 选择框 -->
        <button v-else-if="item.type === 'button'" @click="item.options.click">{{ item.options.text }}</button>
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
      <ol>
        <button @click="onSave">保存</button>
      </ol>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'

import { useStore } from '@/store'
import { storage } from '~/storage'

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
