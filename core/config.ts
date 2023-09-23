import type { PluginConfig } from '~/context/interface'

import { getAllPluginConfigs } from './global'

export const initConfig = () => {
  const configs = getAllPluginConfigs()
  const plugins = import.meta.glob('../app/plugins/**/config.ts', {
    import: 'default',
    eager: true,
  })
  for (const path in plugins) {
    const config = plugins[path] as PluginConfig
    configs[config.name] = config
  }
}
