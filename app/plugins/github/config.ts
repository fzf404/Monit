import type { PluginConfigFile } from '~/context/types'

export default <PluginConfigFile>{
  name: 'github',
  main: 'index.vue',
  width: 200,
  height: 200,
  emoji: '😺',
  description: {
    cn: '代码监控',
    en: 'GitHub Stats',
  },
}
