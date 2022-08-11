/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-08-11 16:00:14
 * @Description: router 配置
 */

import { pluginList } from '#/plugin'
import { createRouter, createWebHashHistory } from 'vue-router'

// 自动生成 router
const routes = pluginList.map((item) => {
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
