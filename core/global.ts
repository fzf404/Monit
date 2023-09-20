import type { Tray } from 'electron'

import type { PluginConfig, PluginStorage } from '~/context/interface'

let trayMenu: Tray
export const getTray = () => {
  return trayMenu
}

const pluginConfigs: Record<string, PluginConfig> = {}
export const getPluginConfigs = () => {
  return pluginConfigs
}
export const getPluginConfig = (name: string) => {
  return pluginConfigs[name]
}

const pluginStorages: Record<string, PluginStorage> = {}
export const getPluginStorages = () => {
  return pluginStorages
}
export const getPluginStorage = (name: string) => {
  return pluginStorages[name]
}
