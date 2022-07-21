/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-22 00:59:40
 * @Description: 存储配置
 */

import Store from 'electron-store'
import { useRoute } from 'vue-router'

// 初始化 store
const store = new Store({
  // 版本更新初始化
  migrations: {
    '>=0.3.0': (store) => {
      store.clear()
    },
  },
})

/**
 * @description: 保存值
 * @param {string} node 节点名
 * @param {string} key 键名
 * @param {any} val 默认值
 * @return {*}
 */
export const cset = (node: string, key: string, val: any): any => {
  return store.set(node + '.' + key, val)
}

/**
 * @description: 读取值
 * @param {*} node 节点名
 * @param {*} key 键名
 * @param {*} def 默认值
 * @return {*}
 */
export const cget = (node: string, key: string, def: any): any => {
  const value = store.get(node + '.' + key)
  return value === undefined ? def : value
}

/**
 * @description:  storage 构造
 * @param {*} node 节点名
 * @return {*}
 */
export const storage = (node: string = useRoute().name as string): any => {
  return {
    // 保存值
    set: (key: string, val: any) => {
      return cset(node, key, val)
    },
    // 读取值
    get: (key: string, def: any) => {
      return cget(node, key, def)
    },
  }
}
