/*
 * @Author: fzf404
 * @Date: 2022-04-04 16:56:57
 * @LastEditTime: 2022-05-30 13:10:35
 * @Description: router 配置
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { pluginList } from '../../common/plugin'

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
