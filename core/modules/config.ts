import type { PluginConfigFile } from '~/types/config'

const pluginConfigMap: Record<string, PluginConfigFile> = {}

const pluginConfigRawMap = import.meta.glob<PluginConfigFile>(
  '/package/**/config.ts',
  {
    import: 'default',
    eager: true,
  },
)

for (const path in pluginConfigRawMap) {
  const pluginConfigItem = pluginConfigRawMap[path]
  pluginConfigMap[pluginConfigItem.name] = pluginConfigItem
}

interface GetPluginConfig {
  (): Record<string, PluginConfigFile>
  (name: string): PluginConfigFile
}

export const getPluginConfig = ((pluginName?: string) => {
  return pluginName ? pluginConfigMap[pluginName] : pluginConfigMap
}) as GetPluginConfig
