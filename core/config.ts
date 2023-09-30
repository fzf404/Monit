import type { PluginConfig } from '~/context/interface'

const pluginConfigs: Record<string, PluginConfig> = {}

const configs = import.meta.glob<PluginConfig>('../app/plugins/**/config.ts', {
  import: 'default',
  eager: true,
})
for (const path in configs) {
  const config = configs[path]
  pluginConfigs[config.name] = config
}

export const getAllPluginConfigs = () => {
  return pluginConfigs
}

export const getPluginConfig = (name: string) => {
  return pluginConfigs[name]
}
