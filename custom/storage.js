/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-06-20 23:31:56
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

// 设置存储值
export const cset = (node, key, value) => {
  return store.set(node + '.' + key, value)
}

// 获取存储值
export const cget = (node, key, def) => {
  const value = store.get(node + '.' + key)
  return value === undefined ? def : value
}

// 存储构造函数
export const storage = (node) => {
  return {
    // 设置值
    set: (key, val) => {
      return cset(node, key, val)
    },
    // 获取值
    get: (key, def) => {
      return cget(node, key, def)
    },
  }
}
