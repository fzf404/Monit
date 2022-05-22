import Store from 'electron-store'

// 初始化 store
const store = new Store({
  // 版本更新初始化
  migrations: {
    '>=0.2.0': (store) => {
      store.clear()
    },
    '>=0.2.3': (store) => {
      store.clear()
    },
  },
})

// 获取值
export const cget = (node, key, def) => {
  const value = store.get(node + '.' + key)
  return value === undefined ? def : value
}

// 设置值
export const cset = (node, key, value) => {
  return store.set(node + '.' + key, value)
}
