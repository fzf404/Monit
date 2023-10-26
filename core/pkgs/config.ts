import type { PluginConfigItem, PluginConfigMap } from '~/context/type'

export const pluginConfigMap: PluginConfigMap = new Map()

const pluginConfigRawMap = import.meta.glob<PluginConfigItem>(
  '../app/plugins/**/config.ts',
  {
    import: 'default',
    eager: true,
  },
)

for (const path in pluginConfigRawMap) {
  const pluginConfigItem = pluginConfigRawMap[path]
  pluginConfigMap.set(pluginConfigItem.name, pluginConfigItem)
}
