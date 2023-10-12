import { existsSync } from 'node:fs'
import { homedir } from 'node:os'

import { is } from '@electron-toolkit/utils'
import { app, BrowserWindow, globalShortcut } from 'electron'

import type { PluginOptions } from '~/context/interface'

import { focusApp, setAppBoot } from './method'
import { getPluginStorage } from './storage'
import { createWindow } from './window'

export const initBoot = () => {
  const path = `${homedir()}/.config/monit`
  console.log(existsSync(path))
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

export const initWatch = ({ name, window }: PluginOptions) => {
  window.on('move', () => {
    const [x, y] = window.getPosition()
    getPluginStorage(name).set('control', { x, y })
  })
  window.on('blur', () => {
    window.webContents.send('set-plugin-navbar', false)
  })
}
