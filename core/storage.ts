import { homedir } from 'node:os'
import { createStorage } from 'unstorage'
import fsLiteDriver from 'unstorage/drivers/fs-lite'

import type { PluginStorage } from '~/context/interface'

let storage: ReturnType<typeof createStorage>

export const initStorage = () => {
  const path = `${homedir()}/.config/monit`

  storage = createStorage<PluginStorage>({
    driver: fsLiteDriver({ base: path }),
  })
}

export const getStorage = () => {
  return storage
}

export const useStorage = async (name: string) => {
  const exist = await storage.hasItem(name)
  if (exist) {
    await storage.setItem(name, {})
  }
  const data = (await storage.getItem(name)) as PluginStorage
  return {
    get: <K extends keyof PluginStorage>(key: K) => data[key],
    set: async <K extends keyof PluginStorage>(
      key: K,
      value: PluginStorage[K],
    ) => {
      data[key] = value
      await storage.setItem(name, data!)
    },
    remove: (key: keyof PluginStorage) => {
      if (data) {
        delete data[key]
        storage.setItem(name, data)
      }
    },
    clear: () => {
      storage.removeItem(name)
    },
  }
}
