import type { PluginConfigFile } from '~/core/contexts/types'

const pluginConfigMap: Record<string, PluginConfigFile> = {}

const pluginConfigRawMap = import.meta.glob<PluginConfigFile>(
  '/app/plugins/**/config.ts',
  {
    import: 'default',
    eager: true,
  },
)

for (const path in pluginConfigRawMap) {
  const pluginConfigItem = pluginConfigRawMap[path]
  pluginConfigMap[pluginConfigItem.name] = pluginConfigItem
}

interface UsePluginConfig {
  (): Record<string, PluginConfigFile>
  (name: string): PluginConfigFile
}

export const usePluginConfig = ((pluginName?: string) => {
  return pluginName ? pluginConfigMap[pluginName] : pluginConfigMap
}) as UsePluginConfig
