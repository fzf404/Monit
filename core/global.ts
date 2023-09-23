import type { PluginConfig, PluginStorage } from '~/context/interface'

const pluginConfigs: Record<string, PluginConfig> = {}
export const getAllPluginConfigs = () => {
  return pluginConfigs
}
export const getPluginConfig = (name: string) => {
  return pluginConfigs[name]
}

const pluginStorages: Record<string, PluginStorage> = {}
export const getAllPluginStorages = () => {
  return pluginStorages
}
export const getPluginStorage = (name: string) => {
  return pluginStorages[name]
}
