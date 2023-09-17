import { app } from 'electron'

import { getStorage } from './storage'

export const quitApp = () => {
  app.quit()
}

export const restartApp = () => {
  app.relaunch()
  quitApp()
}

export const resetApp = async () => {
  const storage = getStorage()
  const list = await storage.getKeys()
  for (const name of list) {
    await storage.removeItem(name)
  }
  restartApp()
}
