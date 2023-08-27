import { createRouter, createWebHashHistory } from 'vue-router'

import { pluginList } from '~/config/plugin'

const components = import.meta.glob('../plugins/**/index.vue')

const routes = pluginList.map((item) => {
  return {
    name: item.name,
    path: '/' + item.name,
    component: () => components[`../plugins/${item.name}/index.vue`](),
  }
})

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
