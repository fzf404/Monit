/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-15 16:44:46
 * @Description: router 配置
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { pluginList } from '~/config/plugin'

// 自动生成 router
// 优化后的代码
const routes = pluginList.map((item) => {
  return {
    name: item.name,
    path: '/' + item.name,
    component: () => {
      return import('./plugins/' + item.name)
    }
  }
})

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
