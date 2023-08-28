import { createRouter, createWebHashHistory } from 'vue-router'

const components = import.meta.glob('../plugins/**/index.vue')

const pluginName = await window.electron.ipcRenderer.invoke('getPluginName')

const routes = [
  {
    name: pluginName,
    path: '/',
    component: () => components[`../plugins/${pluginName}/index.vue`](),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
