import type { MessageBoxReturnValue } from 'electron'
import { app, BrowserWindow, dialog } from 'electron'

import type { PluginLocale } from '~/context/interface'

import { getAllPluginStorages, getPluginStorage } from './storage'

export const quitApp = () => {
  app.quit()
}

export const restartApp = () => {
  app.relaunch()
  quitApp()
}

export const resetApp = async () => {
  const storages = getAllPluginStorages()
  for (const name in storages) {
    await storages[name].clear()
  }
  restartApp()
}

export const focusApp = () => {
  for (const window of BrowserWindow.getAllWindows()) {
    window.focus()
  }
}

export const sendConfirm = (
  name: string,
  message: string,
  callback: () => void,
) => {
  dialog
    .showMessageBox({
      type: 'warning',
      title: `Monit - ${name}`,
      message: `Monit - ${name}`,
      detail: message,
      buttons: ['取消 - Cancel', '确定 - Ok'],
    })
    .then(({ response }: MessageBoxReturnValue) => {
      if (response === 1) {
        callback()
      }
    })
}

export const getAppBoot = () => {
  return app.getLoginItemSettings().openAtLogin
}

export const setAppBoot = (boot: boolean) => {
  app.setLoginItemSettings({
    openAtLogin: boot,
  })
}

export const getAppLocale = () => {
  const storage = getPluginStorage('manage')
  return (
    storage.get('setting')?.locale ??
    (app.getLocale().startsWith('zh') ? 'cn' : 'en')
  )
}

export const setAppLocale = async (locale: PluginLocale) => {
  for (const window of BrowserWindow.getAllWindows()) {
    window.webContents.send('set-plugin-locale', locale)
  }
  const storage = getPluginStorage('manage')
  await storage.set('setting', { locale })
}
