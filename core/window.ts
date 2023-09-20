import { join } from 'node:path'

import { is } from '@electron-toolkit/utils'
import { BrowserWindow, nativeTheme } from 'electron'

import { initHandle } from '~/context/handle'

import { getPluginConfig, getPluginStorage, getPluginStorages } from './global'
import { initWatch } from './watch'

export const initWindow = () => {
  // get plugin data
  const storages = getPluginStorages()
  // create boot plugin
  for (const name in storages) {
    if (storages[name].config?.boot) {
      createWindow(name)
    }
  }
  // create default plugin
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow('guide')
  }
}

export const createWindow = (name: string) => {
  // get plugin config
  const config = getPluginConfig(name)
  // get plugin data
  const storage = getPluginStorage(name)
  // create window
  const window = new BrowserWindow({
    x: storage.config?.x,
    y: storage.config?.y,

    width: config.width,
    height: config.height,

    title: `Monit - ${name}`,

    frame: false,
    resizable: false,
    hasShadow: false,
    transparent: true,
    skipTaskbar: true,
    fullscreenable: false,

    alwaysOnTop: storage.config?.sticky,

    vibrancy:
      storage.config?.theme ??
      (nativeTheme.shouldUseDarkColors ? 'dark' : 'light'),
    visualEffectState: 'active',

    webPreferences: {
      scrollBounce: true,
      preload: join(__dirname, '../preload/index.js'),
    },
  })

  // watch window event
  initWatch({ name, window })
  // handle renderer event
  initHandle({ name, window })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    window.loadURL(process.env['ELECTRON_RENDERER_URL']!)
  } else {
    window.loadFile(join(__dirname, '../renderer/index.html'), { hash: name })
  }
}
