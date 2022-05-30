/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-05-30 20:00:27
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

// 获取存储值
export const cget = (node, key, def) => {
  const value = store.get(node + '.' + key)
  return value === undefined ? def : value
}

// 设置存储值
export const cset = (node, key, value) => {
  return store.set(node + '.' + key, value)
}
