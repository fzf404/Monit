/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-15 16:58:15
 * @Description: 存储配置
 */

import Store from 'electron-store'

import { reactive, watch } from 'vue'

import { getValue, setValue } from '~/server/send'

// 初始化 store
export const store = new Store({
  // 版本更新初始化
  migrations: {
    '>=0.3.0': (store) => {
      // 清空配置
      store.clear()
    },
    '>=0.7.0': (store) => {
      // 判断配置
      if (store.has('_config')) {
        // 复制配置
        store.set('config', store.get('_config'))
        // 删除配置
        store.delete('_config')
      }
    },
    '>=0.8.0': (store) => {
      // 判断配置
      if (store.has('config.open')) {
        // 复制配置
        store.set('config.boot', store.get('config.open'))
        // 删除配置
        store.delete('config.open')
      }
    }
  }
})

/**
 * @description: 保存值
 * @param { string } node 节点名
 * @param { string } key 键名
 * @param { Object } value 值
 */
export const set = (node: string, key: string, value: Object): void => {
  store.set(node + '.' + key, value) // 存储值
}

/**
 * @description: 读取值
 * @param { string } node 节点名
 * @param { string } key 键名
 * @param { Object } define 默认值
 * @return { Object } 值
 */
export const get = (node: string, key: string, define: Object): Object => {
  return store.get(node + '.' + key) ?? define // 获取值
}

/**
 * @description: 删除值
 * @param {string} node
 * @return {*}
 */
export const remove = (node: string): void => {
  store.delete(node)
}

/**
 * @description: 清空值
 * @return {*}
 */
export const clear = (): void => {
  store.clear()
}

/**
 * @description: 响应式 storage
 * @param { Record<string, Object> } source 原始参数
 * @param { Record<K, Function> } callback 回调函数
 * @return { Source } 响应式参数
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
      (val) => {
        // 保存值
        setValue(key, val)
        // 运行处理函数
        if (callback?.[key as K]) {
          callback[key as K](val)
        }
      },
      { deep: true }
    )
  }
  // 返回响应式数据
  return target
}
