import { app } from 'electron'

import { storage } from './storage'

const quitApp = () => {
  app.quit()
}

const restartApp = () => {
  app.relaunch()
  quitApp()
}

const resetApp = () => {
  storage.data = {}
  storage.write()
  restartApp()
}

export { quitApp, restartApp, resetApp }
