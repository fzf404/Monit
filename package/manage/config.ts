import type { PluginConfigFile } from '~/types/types'

export default <PluginConfigFile>{
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
