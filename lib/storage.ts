/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-10-03 18:23:49
 * @Description: 存储配置
 */
import Store from 'electron-store'

import { reactive, watch } from 'vue'

import { getValue, setValue } from '#/ipc'

// 初始化 store
export const store = new Store({
  // 版本更新初始化
  migrations: {
    '>=0.3.0': (store) => {
      store.clear()
    },
    '>=0.7.0': (store) => {
      if (store.has('_config')) {
        store.set('config', store.get('_config'))
        store.delete('_config')
      }
    },
  },
})

/**
 * @description: 保存值
 * @param {string} node 节点名
 * @param {string} key 键名
 * @param {Object} value 值
 * @return {*}
 */
export const cset = (node: string, key: string, value: Object): void => {
  // console.log(node + '.' + key, value)
  store.set(node + '.' + key, value) // 存储值
}

/**
 * @description: 读取值
 * @param {string} node 节点名
 * @param {string} key 键名
 * @param {Object} define 默认值
 * @return {*}
 */
export const cget = (node: string, key: string, define: Object): Object => {
  // console.log(node + '.' + key, define)
  return store.get(node + '.' + key) ?? define // 读取值
}

/**
 * @description: 响应式 storage
 * @param {*} K 原始参数 key 值
 * @return {*} 目标响应式参数
 */

type Source = Record<string, Object>

export const storage = <K extends keyof Source>(source: Source, callback?: Record<K, Function>): Source => {
  // 包装为响应式数据
  const target = reactive(source)
  // 遍历响应式数据
  for (const key in target) {
    // 读取默认值
    target[key] = getValue(key, target[key])
    // 监听值修改
    watch(
      () => target[key],
      async (val) => {
        // 保存值
        setValue(key, val)
        // 运行处理函数
        if (callback && key in callback) {
          await callback[key as K](val)
        }
      },
      { deep: true }
    )
  }
  // 返回响应式数据
  return target
}
