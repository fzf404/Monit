import type { PluginConfig } from '~/context/interface'

import { getPluginConfigs } from './global'

export const initConfig = async () => {
  const configs = getPluginConfigs()
  const plugins = import.meta.glob('../app/plugins/**/config.ts')
  for (const path in plugins) {
    const name = path.match(/\.\.\/app\/plugins\/(.*)\/config\.ts/)![1]
    const config = (await plugins[path]()) as { default: PluginConfig }
    configs[name] = config.default
  }
}
