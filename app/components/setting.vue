<!--
 * @Author: fzf404
 * @Date: 2022-07-23 21:02:45
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-10-03 14:26:44
 * @Description: setting 组件
-->
<template>
  <!-- 设置模态框 -->
  <aside class="flex-col-center modal setting z-50" v-show="store.setting.show">
    <!-- 设置框 -->
    <ul class="w-3/5 px-4 py-3 pb-2 space-y-2 ring-4 rounded-lg" :class="{ 'w-3/4 px-3': size === 'wide' }">
      <!-- 设置列表 -->
      <li class="flex-row-between h-8 px-2 rounded" v-for="item in setting">
        <!-- 标签 -->
        <label :for="item.id" class="flex space-x-0.5 text-xs">
          <span>
            {{ item.label }}
          </span>
          <HelpSVG v-show="item.help" class="w-3 self-center btn-svg text-gray" @click="openURL(item.help as string)" />
        </label>

        <!-- 选择框 -->
        <select
          v-if="item.type === 'select'"
          :id="item.id"
          class="w-3/5 px-2 py-1 outline-none border-none rounded text-xs"
          v-model.lazy="config[item.id]"
        >
          <option v-for="option in item.options" :value="option.value">
            {{ option.label }}
          </option>
        </select>

        <!-- 按钮 -->
        <button v-else-if="item.type === 'button'" class="btn btn-xs w-1/3" :id="item.id" @click="item.options.click">
          {{ item.options.text }}
        </button>

        <!-- 复选框 -->
        <input
          v-else-if="item.type === 'checkbox'"
          :id="item.id"
          type="checkbox"
          class="w-4 h-4 outline-none"
          v-model.lazy="(config[item.id] as boolean)"
          @keyup.enter="onSave"
        />

        <!-- 数字输入框 -->
        <input
          v-else-if="item.type === 'number'"
          :id="item.id"
          type="number"
          class="w-3/5 px-2 py-1 rounded outline-none border-none text-right text-xs"
          v-model.lazy="config[item.id]"
          @keyup.enter="onSave"
          @input="
            (event) => {
              // number 最大长度
              if ((event.target as HTMLInputElement).value.length > item.options.len)
                (event.target as HTMLInputElement).value = (event.target as HTMLInputElement).value.slice(0, item.options.len)
            }
          "
        />

        <!-- 文本输入框 -->
        <input
          v-else-if="item.type === 'text'"
          :id="item.id"
          type="text"
          class="w-3/5 px-2 py-1 rounded outline-none border-none text-right text-xs"
          v-model.lazy="config[item.id]"
          @keyup.enter="onSave"
        />
      </li>
      <!-- 保存 -->
      <ol class="flex-row-center-right">
        <button @click="onSave" class="btn btn-sm">保存</button>
      </ol>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { openURL } from '#/ipc'
import { useStore } from '@/store'

import HelpSVG from '@/assets/setting/help.svg'

// props 接口
interface Props {
  // 尺寸
  size?: 'wide'
  // 配置
  config: Record<string, Object>
  // 信息
  setting: (
    | {
        id: string
        label: string
        type: 'text' | 'checkbox'
        help?: string
      }
    | {
        id: string
        label: string
        type: 'number'
        help?: string
        options: { len: number }
      }
    | {
        id: string
        label: string
        type: 'select'
        help?: string
        options: { label: string; value: string }[]
      }
    | {
        id: string
        label: string
        type: 'button'
        help?: string
        options: { text: string; click: () => void }
      }
  )[]
}

defineProps<Props>()

const emit = defineEmits(['save'])

// 初始化 store
const store = useStore()

// 初始化设置
store.setting.has = true

// 保存
const onSave = () => {
  // 隐藏设置框
  store.setting.show = false
  // 发送保存事件
  emit('save')
}
</script>

<style scoped>
/* 去除箭头 */
input[type='number']::-webkit-inner-spin-button {
  appearance: none;
}
</style>
