import type { PluginConfig } from '~/context/interface'

const pluginConfigs: Record<string, PluginConfig> = {}

const pluginRawConfigs = import.meta.glob('../plugins/**/config.ts', {
  import: 'default',
  eager: true,
}) as Record<string, PluginConfig>

for (const path in pluginRawConfigs) {
  const config = pluginRawConfigs[path]
  pluginConfigs[config.name] = config
}

export { pluginConfigs, pluginRawConfigs }
