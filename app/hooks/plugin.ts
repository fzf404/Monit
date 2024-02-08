import type { Component } from 'vue'

import { getPluginSource } from '@/utils/plugin'
import type { PluginConfigFile } from '~/types/config'

const { pluginConfigs, pluginComponents } = getPluginSource()

type getPluginConfig = {
  (): Record<string, PluginConfigFile>
  (name: string): PluginConfigFile
}

export const getPluginConfig = ((name?: string) => {
  return name ? pluginConfigs[name] : pluginConfigs
}) as getPluginConfig

type UsePluginComponent = {
  (): Record<string, () => Promise<Component>>
  (name: string): () => Promise<Component>
}

export const getPluginComponent = ((name?: string) => {
  return name ? pluginComponents[name] : pluginComponents
}) as UsePluginComponent
