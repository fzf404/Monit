import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = []
const plugin = (await window.electron?.ipcRenderer.invoke('plugin.name')) ?? 'guide'
const components = import.meta.glob('../plugins/**/index.vue')

routes.push({
  path: `/`,
  redirect: `/${plugin}`,
})

for (const path in components) {
  const name = path.match(/\.\.\/plugins\/(.*)\/index\.vue/)![1]

  routes.push({
    name,
    path: `/${name}`,
    component: () => components[path](),
  })
}

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
