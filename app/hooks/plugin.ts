import type { Component } from 'vue'

import { getPluginSource } from '@/utils/plugin'
import type { PluginConfigFile } from '~/context/types'

const { pluginConfigs, pluginComponents } = getPluginSource()

type UsePluginConfig = {
  (): Record<string, PluginConfigFile>
  (name: string): PluginConfigFile
}

export const usePluginConfig = ((name?: string) => {
  return name ? pluginConfigs[name] : pluginConfigs
}) as UsePluginConfig

type UsePluginComponent = {
  (): Record<string, () => Promise<Component>>
  (name: string): () => Promise<Component>
}

export const usePluginComponent = ((name?: string) => {
  return name ? pluginComponents[name] : pluginComponents
}) as UsePluginComponent

export { pluginConfigs, pluginComponents as pluginsComponents }
