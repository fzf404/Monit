/*
 * @Author: fzf404
 * @Date: 2022-04-04 16:56:57
 * @LastEditTime: 2022-04-04 17:12:50
 * @Description: vue-router
 */
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: 'Github',
    component: () => import('@/components/Github'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
