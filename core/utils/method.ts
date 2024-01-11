import { app, BrowserWindow } from 'electron'

import { useStorage } from '@/hooks/storage'
import type { Locale } from '~/core/contexts/types'

export const quitApp = () => {
  app.quit()
}

export const restartApp = () => {
  app.relaunch()
  quitApp()
}

export const resetApp = async () => {
  const storages = useStorage()
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

export const getAppBoot = () => {
  return app.getLoginItemSettings().openAtLogin
}

export const setAppBoot = (boot: boolean) => {
  app.setLoginItemSettings({
    openAtLogin: boot,
  })
}

export const getLocale = () => {
  const storage = useStorage('manage')
  return (storage.get('setting')?.locale ??
    (app.getLocale().startsWith('zh') ? 'cn' : 'en')) as Locale
}

export const setLocale = async (locale: Locale) => {
  for (const window of BrowserWindow.getAllWindows()) {
    window.webContents.send('set-plugin-locale', locale)
  }
  const storage = useStorage('manage')
  await storage.set('setting', { locale })
}
