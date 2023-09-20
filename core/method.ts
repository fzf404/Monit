import { app, BrowserWindow } from 'electron'

import type { PluginLocale } from '~/context/interface'

import { getPluginStorages } from './global'

export const quitApp = () => {
  app.quit()
}

export const restartApp = () => {
  app.relaunch()
  quitApp()
}

export const resetApp = async () => {
  const storages = getPluginStorages()
  for (const name in storages) {
    await storages[name].clear()
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
  for (const storage in getPluginStorages()) {
    getPluginStorages()[storage].set('config', { locale })
  }
}
