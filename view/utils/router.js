/*
 * @Author: fzf404
 * @Date: 2022-04-04 16:56:57
 * @LastEditTime: 2022-05-18 20:26:29
 * @Description: router 配置
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    name: 'github',
    path: '/github',
    component: () => import('../plugins/github'),
  },
  {
    name: 'bilibili',
    path: '/bilibili',
    component: () => import('../plugins/bilibili'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
