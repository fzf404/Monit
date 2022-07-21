/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-22 00:50:42
 * @Description: router 配置
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import { pluginList } from '../custom/plugin'

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

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
