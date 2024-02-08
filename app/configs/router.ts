import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

import { getPluginComponent, getPluginConfig } from '@/hooks/plugin'

const pluginConfigs = getPluginConfig()
const pluginComponents = getPluginComponent()

const routes: RouteRecordRaw[] = [
  {
    path: `/`,
    redirect: { name: 'manage' },
  },
]

for (const name in pluginConfigs) {
  routes.push({
    name,
    path: `/${name}`,
    component: () => pluginComponents[name](),
  })
}

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
})
