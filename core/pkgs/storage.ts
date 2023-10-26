import { homedir } from 'node:os'

import { createStorage } from 'unstorage'
import fsLiteDriver from 'unstorage/drivers/fs-lite'

import type { PluginDataItem } from '~/context/type'

import { usePluginConfig } from '../hooks/config'

export type PluginStorageItem = {
  get: <K extends keyof PluginDataItem>(key: K) => PluginDataItem[K]
  set: <K extends keyof PluginDataItem>(
    key: K,
    value: PluginDataItem[K],
  ) => Promise<void>
  clear: () => Promise<void>
}

export type PluginStorageMap = Map<string, PluginStorageItem>

export const pluginStorageMap: PluginStorageMap = new Map()

export const initStorage = async () => {
  const path = `${homedir()}/.config/monit`

  const storage = createStorage({
    driver: fsLiteDriver({ base: path }),
  })

  const pluginConfigMap = usePluginConfig()

  for (const name in pluginConfigMap) {
    const file = `${name}.json`

    const exist = await storage.hasItem(file)

    if (!exist) {
      await storage.setItem(file, {})
    }

    const data = (await storage.getItem(file)) as PluginDataItem

    pluginStorageMap.set(name, {
      get: (key) => {
        return data[key]
      },
      set: async (key, value) => {
        data[key] = { ...data[key], ...value }
        await storage.setItem(file, JSON.stringify(data, undefined, 2))
      },
      clear: async () => {
        await storage.removeItem(file)
      },
    })
  }
}
