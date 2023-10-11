import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

import { pluginConfigs, pluginsComponents } from './plugin'

const routes: RouteRecordRaw[] = [
  {
    path: `/`,
    redirect: { name: 'manage' },
  },
]

for (const name in pluginConfigs) {
  routes.push({
    name: name,
    path: `/${name}`,
    component: () => pluginsComponents[name](),
  })
}

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
