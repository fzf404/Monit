import type { PluginConfigItem, PluginConfigMap } from '~/context/type'

import { pluginConfigMap } from '../pkgs/config'

interface UsePluginConfig {
  (): PluginConfigMap
  (name: string): PluginConfigItem
}

export const usePluginConfig = ((pluginName?: string) => {
  return pluginName ? pluginConfigMap.get(pluginName) : pluginConfigMap
}) as UsePluginConfig
