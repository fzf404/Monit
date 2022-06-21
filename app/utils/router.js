/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-06-19 00:54:06
 * @Description: 路由配置
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import { pluginList } from '../../common/plugin'

// 自动生成路由
const routes = pluginList.map((item) => {
  return {
    name: item.name,
    path: '/' + item.name,
    component: () => import('../plugins/' + item.name),
  }
})

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
