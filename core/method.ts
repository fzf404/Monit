import { app, BrowserWindow } from 'electron'

import type { PluginLocale } from '~/context/interface'

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

export const getAppBoot = () => {
  return app.getLoginItemSettings().openAtLogin
}

export const setAppBoot = (boot: boolean) => {
  app.setLoginItemSettings({
    openAtLogin: boot,
  })
}

export const setAppLocale = (locale: PluginLocale) => {
  for (const window of BrowserWindow.getAllWindows()) {
    window.webContents.send('set-plugin-language', locale)
  }
}
