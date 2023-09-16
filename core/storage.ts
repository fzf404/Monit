import { homedir } from 'node:os'

import type { Storage } from 'unstorage'
import { createStorage } from 'unstorage'
import fsLiteDriver from 'unstorage/drivers/fs-lite'

import type { PluginData, PluginStorage } from '~/context/interface'

let storage: Storage<PluginData>

export const initStorage = () => {
  const path = `${homedir()}/.config/monit`

  storage = createStorage<PluginData>({
    driver: fsLiteDriver({ base: path }),
  })
}

export const getStorage = () => {
  return storage
}

export const useStorage = async (name: string): Promise<PluginStorage> => {
  const exist = await storage.hasItem(name)
  if (!exist) {
    await storage.setItem(name, {})
  }
  const data = (await storage.getItem(name)) as PluginData
  return {
    get: (key) => data[key],
    set: async (key, value) => {
      data[key] = value
      await storage.setItem(name, data)
    },
    remove: async (key) => {
      delete data[key]
      await storage.setItem(name, data)
    },
    clear: async () => {
      await storage.removeItem(name)
    },
  }
}
