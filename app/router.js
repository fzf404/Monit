/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-08 18:57:58
 * @Description: router 配置
 */

import { pluginList } from '#/plugin'
import { createRouter, createWebHashHistory } from 'vue-router'

const isDebug = process.env.NODE_ENV === 'development'

// 生产模式 & debug 不开启插件
const pluginLists = pluginList.filter(({ debug }) => !(!isDebug && debug))

// 自动生成 router
const routes = pluginLists.map((item) => {
  return {
    name: item.name,
    path: '/' + item.name,
    component: () => import('./plugins/' + item.name),
  }
})

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
