import type { PluginConfigFile } from '~/types/types'

export default <PluginConfigFile>{
  name: 'count',
  main: 'index.vue',
  width: 200,
  height: 200,
  emoji: '🔘',
  description: {
    cn: '计数器',
    en: 'Counter',
  },
}
