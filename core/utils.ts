import { existsSync } from 'node:fs'
import { homedir } from 'node:os'

import { is } from '@electron-toolkit/utils'
import { app, BrowserWindow, globalShortcut } from 'electron'

import { useStorage } from './hooks/storage'
import { createWindow } from './modules/window'
import { focusApp, setAppBoot } from './utils/method'

export const initBoot = () => {
  const path = `${homedir()}/.config/monit`
  !existsSync(path) && setAppBoot(true)
}

export const initLock = () => {
  if (!is.dev && !app.requestSingleInstanceLock()) {
    app.quit()
  }

  app.on('second-instance', () => {
    focusApp()
  })
}

export const initShortcut = () => {
  globalShortcut.register('CommandOrControl+Shift+m', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow('guide')
    } else {
      focusApp()
    }
  })
}

export const initWatch = ({ name, window }) => {
  window.on('move', () => {
    const [x, y] = window.getPosition()
    useStorage(name).set('control', { x, y })
  })
  window.on('blur', () => {
    window.webContents.send('set-plugin-blur')
  })
}
