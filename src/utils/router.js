/*
 * @Author: fzf404
 * @Date: 2022-04-04 16:56:57
 * @LastEditTime: 2022-04-16 13:19:35
 * @Description: vue-router
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    name: 'Github',
    component: () => import('@/components/Github'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
