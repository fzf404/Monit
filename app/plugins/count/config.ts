import type { PluginConfig } from '~/context/interface'

export default <PluginConfig>{
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
