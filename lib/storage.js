/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-19 16:28:36
 * @Description: 存储配置
 */

import Store from 'electron-store'

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
 * @param {*} node 节点名
 * @param {*} key 键名
 * @param {*} value 值
 * @return {*}
 */
export const cset = (node, key, value) => {
  return store.set(node + '.' + key, value)
}

/**
 * @description: 读取值
 * @param {*} node 节点名
 * @param {*} key 键名
 * @param {*} def 默认值
 * @return {*}
 */
export const cget = (node, key, def) => {
  const value = store.get(node + '.' + key)
  return value === undefined ? def : value
}

/**
 * @description: 存储类构造
 * @param {*} node 节点名
 * @return {*}
 */
export const storage = (node) => {
  return {
    // 保存值
    set: (key, val) => {
      return cset(node, key, val)
    },
    //读取值
    get: (key, def) => {
      return cget(node, key, def)
    },
  }
}
