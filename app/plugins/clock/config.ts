import type { PluginConfigFile } from '~/context/types'

export default <PluginConfigFile>{
  name: 'clock',
  main: 'index.vue',
  width: 200,
  height: 200,
  emoji: '⏰',
  description: {
    cn: '数字时钟',
    en: 'Digital Clock',
  },
}
