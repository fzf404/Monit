<!--
 * @Author: fzf404
 * @Date: 2022-07-23 21:02:45
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-31 23:43:38
 * @Description: setting 布局
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
        <!-- 输入框 -->
        <input
          v-else
          :id="item.id"
          :type="item.type"
          v-model.lazy="config[item.id]"
          @keyup.enter="onSave"
          @input="
            (event) => {
              // number 设置最大长度
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
import { useStore } from '@/store'
import { onMounted, watchEffect } from 'vue'
import { storage } from '~/storage'

// 初始化 storage
const { set } = storage()
// 初始化 store
const store = useStore()

// 初始化 props
interface Props {
  size?: 'small'
  config: {
    [key: string]: any
  }
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
  )[]
}

const props = defineProps<Props>()
const emit = defineEmits(['save'])

onMounted(() => {
  // 初始化配置
  store.setting.has = true
})

watchEffect(() => {
  // 保存数据
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

<style scoped></style>
