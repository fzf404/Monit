import type { Component } from 'vue'

import type { PluginConfig } from '~/context/interface'

const pluginConfigs: Record<string, PluginConfig> = {}
const pluginsComponents: Record<string, () => Promise<Component>> = {}

const pluginRawConfigs = import.meta.glob('../plugins/**/config.ts', {
  import: 'default',
  eager: true,
}) as Record<string, PluginConfig>
const pluginsRawComponents = import.meta.glob<Component>('../plugins/**/*.vue')

for (const path in pluginRawConfigs) {
  const config = pluginRawConfigs[path]
  pluginConfigs[config.name] = config
  pluginsComponents[config.name] =
    pluginsRawComponents[path.replace('config.ts', config.main)]
}

export { pluginConfigs, pluginRawConfigs, pluginsComponents }
