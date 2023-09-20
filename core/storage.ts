import { homedir } from 'node:os'

import { createStorage } from 'unstorage'
import fsLiteDriver from 'unstorage/drivers/fs-lite'

import type { PluginData } from '~/context/interface'

import { getPluginConfigs, getPluginStorages } from './global'

export const initStorage = async () => {
  const path = `${homedir()}/.config/monit`
  const storage = createStorage({
    driver: fsLiteDriver({ base: path }),
  })
  const storages = getPluginStorages()
  for (const name in getPluginConfigs()) {
    const file = `${name}.json`
    const exist = await storage.hasItem(file)
    if (!exist) {
      await storage.setItem(file, {})
    }
    const data = (await storage.getItem(file)) as PluginData
    storages[name] = {
      ...data,
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
