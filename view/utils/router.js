/*
 * @Author: fzf404
 * @Date: 2022-04-04 16:56:57
 * @LastEditTime: 2022-05-16 00:25:23
 * @Description: router 配置
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    name: 'Github',
    component: () => import('../components/Github'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
