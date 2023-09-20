import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

import type { PluginConfig } from '~/context/interface'

const routes: RouteRecordRaw[] = [
  {
    path: `/`,
    redirect: { name: 'guide' },
  },
]

const plugins = import.meta.glob('../plugins/**/*.vue')

const configs = import.meta.glob('../plugins/**/config.ts', {
  import: 'default',
  eager: true,
})

for (const path in configs) {
  const config = configs[path] as PluginConfig
  routes.push({
    name: config.name,
    path: `/${config.name}`,
    component: () => plugins[path.replace('config.ts', config.main)](),
  })
}

// const plugins = import.meta.glob('../plugins/**/index.vue')

// for (const path in plugins) {
//   const name = path.match(/\.\.\/plugins\/(.*)\/index\.vue/)![1]
//   routes.push({
//     name,
//     path: `/${name}`,
//     component: () => plugins[path](),
//   })
// }

export const router = () => {
  return createRouter({
    history: createWebHashHistory(),
    routes,
  })
}
