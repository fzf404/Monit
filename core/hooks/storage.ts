import type { PluginStorage, PluginStorageMap } from '@/modules/storage'
import { pluginStorageMap } from '@/modules/storage'

type UseStorage = {
  (): PluginStorageMap
  (name: string): PluginStorage
}

export const useStorage = ((name?: string) => {
  return name ? pluginStorageMap[name] : pluginStorageMap
}) as UseStorage
