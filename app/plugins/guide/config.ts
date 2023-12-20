import type { PluginConfigFile } from '~/context/types'

export default <PluginConfigFile>{
  name: 'guide',
  main: 'index.vue',
  width: 200,
  height: 200,
  emoji: '👋',
  description: {
    cn: '快速开始',
    en: 'Quick Start',
  },
}
