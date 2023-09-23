import { join } from 'node:path'

import { is } from '@electron-toolkit/utils'
import { BrowserWindow, nativeTheme } from 'electron'

import { initHandle } from '~/context/handle'

import {
  getAllPluginStorages,
  getPluginConfig,
  getPluginStorage,
} from './global'
import { initWatch } from './watch'

export const initWindow = () => {
  const storages = getAllPluginStorages()
  for (const name in storages) {
    if (storages[name].get('control')?.boot) {
      createWindow(name)
    }
  }
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow('guide')
  }
}

export const createWindow = (name: string) => {
  const exist = BrowserWindow.getAllWindows().find(
    (window) => window.title === `Monit - ${name}`,
  )
  if (exist) {
    return exist.focus()
  }
  const config = getPluginConfig(name)
  const storage = getPluginStorage(name)
  const window = new BrowserWindow({
    x: storage.get('control')?.x,
    y: storage.get('control')?.y,

    width: config.width,
    height: config.height,

    title: `Monit - ${name}`,

    frame: false,
    resizable: false,
    hasShadow: false,
    transparent: true,
    skipTaskbar: true,
    fullscreenable: false,

    alwaysOnTop: storage.get('control')?.sticky,

    vibrancy:
      storage.get('control')?.theme ??
      (nativeTheme.shouldUseDarkColors ? 'dark' : 'light'),
    visualEffectState: 'active',

    webPreferences: {
      scrollBounce: true,
      preload: join(__dirname, '../preload/index.js'),
    },
  })

  initWatch({ name, window })
  initHandle({ name, window })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    window.loadURL(process.env['ELECTRON_RENDERER_URL']!)
  } else {
    window.loadFile(join(__dirname, '../renderer/index.html'), { hash: name })
  }
}
