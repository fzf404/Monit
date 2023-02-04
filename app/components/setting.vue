<!--
 * @Author: fzf404
 * @Date: 2022-07-23 21:02:45
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-02-04 13:19:05
 * @Description: setting 组件
-->
<template>
  <transition name="fade" mode="out-in">
    <aside class="flex-col-center modal setting z-40" v-show="pinia.showSetting">
      <!-- 设置框 -->
      <ul class="w-3/5 space-y-2 rounded-lg px-4 py-3 pb-2 ring-4" :class="{ 'w-3/4 px-3': size === 'small' }">
        <!-- 项目列表 -->
        <li class="flex-row-between h-8 rounded px-2" v-for="item in setting">
          <!-- 标签 -->
          <label :for="item.id" class="flex space-x-0.5 text-xs">
            <span>
              {{ item.label }}
            </span>
            <HelpSVG
              v-show="item.help"
              class="btn-svg text-gray w-3 self-center"
              @click="openURL(item.help as string)" />
          </label>
          <!-- 选择框 -->
          <select
            v-if="item.type === 'select'"
            :id="item.id"
            class="w-3/5 rounded border-none px-2 py-1 text-xs outline-none"
            v-model="store[item.id]">
            <option v-for="option in item.options" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          <!-- 按钮 -->
          <button v-else-if="item.type === 'button'" class="btn btn-sm w-1/3" :id="item.id" @click="item.options.click">
            {{ item.options.text }}
          </button>
          <!-- 复选框 -->
          <input
            v-else-if="item.type === 'checkbox'"
            :id="item.id"
            type="checkbox"
            class="h-4 w-4 outline-none"
            v-model="(store[item.id] as boolean)"
            @keyup.enter="onSave" />
          <!-- 数字输入框 -->
          <input
            v-else-if="item.type === 'number'"
            :id="item.id"
            type="number"
            class="w-3/5 rounded border-none px-2 py-1 text-right text-xs outline-none"
            v-model.lazy="store[item.id]"
            @keyup.enter="onSave"
            @input="
            (event) => {
              // number 最大长度
              if ((event.target as HTMLInputElement).value.length > item.options.len)
                (event.target as HTMLInputElement).value = (event.target as HTMLInputElement).value.slice(0, item.options.len)
            }
          " />
          <!-- 文本输入框 -->
          <input
            v-else-if="item.type === 'text'"
            :id="item.id"
            type="text"
            class="w-3/5 rounded border-none px-2 py-1 text-right text-xs outline-none"
            v-model.lazy="store[item.id]"
            @keyup.enter="onSave" />
        </li>
        <!-- 保存 -->
        <ol class="flex-row-center-right">
          <button @click="onSave" class="btn btn-md">保存</button>
        </ol>
      </ul>
    </aside>
  </transition>
</template>

<script setup lang="ts">
import { openURL } from '#/ipc'
import { main } from '@/pinia'

import HelpSVG from '@/assets/setting/help.svg'

// 初始化 pinia
const pinia = main()

// props 接口
interface Props {
  // 尺寸
  size?: 'small' | 'normal' | 'large'
  // 设置值
  store: Record<string, Object>
  // 设置项
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

// 初始化参数
withDefaults(defineProps<Props>(), {
  size: 'normal',
})

// 初始化方法
const emit = defineEmits(['save'])

// 初始化设置
pinia.initSetting()

// 保存
const onSave = () => {
  // 隐藏设置框
  pinia.closeSetting()
  // 发送保存事件
  emit('save')
}
</script>

<style scoped>
/* 去除数字输入框箭头 */
input[type='number']::-webkit-inner-spin-button {
  appearance: none;
}
</style>
