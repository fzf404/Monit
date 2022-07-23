<!--
 * @Author: fzf404
 * @Date: 2022-07-23 21:02:45
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-23 23:19:26
 * @Description: setting 布局
-->
<template>
  <!-- 设置模态框 -->
  <aside class="setting" :class="{ 'setting-sm': props.size === 'small' }" v-show="store.setting === true">
    <!-- 设置 -->
    <ul>
      <!-- 设置列表 -->
      <li v-for="item in store.settingList">
        <!-- 设置标签 -->
        <label :for="item.id">{{ item.title }}</label>
        <!-- 选择框 -->
        <select v-if="item.type === 'select'" v-model.lazy="store.config[item.id]">
          <option v-for="option in item.options" :value="option.value">
            {{ option.title }}
          </option>
        </select>
        <!-- 输入框 -->
        <input
          v-else
          :id="item.id"
          :type="item.type"
          v-model.lazy="store.config[item.id]"
          @keyup.enter="store.setting = false"
        />
      </li>
      <!-- 保存 -->
      <ol>
        <button @click="store.setting = false">OK</button>
      </ol>
    </ul>
  </aside>
</template>

<script setup>
import { useMainStore } from '#/store'

// 初始化 store
const store = useMainStore()

// 初始化 props
const props = defineProps(['size'])
</script>

<style scoped></style>
