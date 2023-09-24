import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

import { pluginRawConfigs } from './plugin'

const routes: RouteRecordRaw[] = [
  {
    path: `/`,
    redirect: { name: 'guide' },
  },
]

const plugins = import.meta.glob('../plugins/**/*.vue')

for (const path in pluginRawConfigs) {
  const config = pluginRawConfigs[path]
  routes.push({
    name: config.name,
    path: `/${config.name}`,
    component: () => plugins[path.replace('config.ts', config.main)](),
  })
}

export const router = () => {
  return createRouter({
    history: createWebHashHistory(),
    routes,
  })
}
