import { homedir } from 'node:os'

import { createStorage } from 'unstorage'
import fsLiteDriver from 'unstorage/drivers/fs-lite'

import type { PluginStorageFile } from '~/context/types'

import { usePluginConfig } from './config'

export type PluginStorage = {
  get: <K extends keyof PluginStorageFile>(key: K) => PluginStorageFile[K]
  set: <K extends keyof PluginStorageFile>(
    key: K,
    value: PluginStorageFile[K],
  ) => Promise<void>
  clear: () => Promise<void>
}

export type PluginStorageMap = Record<string, PluginStorage>

export const pluginStorageMap: PluginStorageMap = {}

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

    const data = (await storage.getItem(file)) as PluginStorageFile

    pluginStorageMap[name] = {
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
    }
  }
}
