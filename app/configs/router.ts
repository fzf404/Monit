import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: `/`,
    redirect: { name: 'guide' },
  },
]

const plugins = import.meta.glob('../plugins/**/index.vue')

for (const path in plugins) {
  const name = path.match(/\.\.\/plugins\/(.*)\/index\.vue/)![1]
  routes.push({
    name,
    path: `/${name}`,
    component: () => plugins[path](),
  })
}

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
