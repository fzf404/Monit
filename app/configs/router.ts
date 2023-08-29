import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: `/`,
    redirect: { name: 'guide' },
  },
]

const components = import.meta.glob('../plugins/**/index.vue')

for (const path in components) {
  const name = path.match(/\.\.\/plugins\/(.*)\/index\.vue/)![1]
  routes.push({
    name,
    path: `/${name}`,
    component: () => components[path](),
  })
}

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
