import type { PluginConfig } from '~/context/interface'

export default <PluginConfig>{
  name: 'manage',
  main: 'index.vue',
  width: 200,
  height: 300,
  emoji: '⚙️',
  description: {
    cn: '插件管理',
    en: 'Plugin Manage',
  },
}
