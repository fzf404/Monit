import { app } from 'electron'

import { useStorage } from './storage'

const storage = useStorage()

export const quitApp = () => {
  app.quit()
}

export const restartApp = () => {
  app.relaunch()
  quitApp()
}

export const resetApp = () => {
  storage.data = {}
  storage.write()
  restartApp()
}
