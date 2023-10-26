import type { PluginStorageItem, PluginStorageMap } from '../pkgs/storage'
import { pluginStorageMap } from '../pkgs/storage'

type UsePluginStorage = {
  (): PluginStorageMap
  (name: string): PluginStorageItem
}

export const usePluginStorage = ((name?: string) => {
  return name ? pluginStorageMap.get(name) : pluginStorageMap
}) as UsePluginStorage
