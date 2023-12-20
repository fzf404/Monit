import { join } from 'node:path'

import { is } from '@electron-toolkit/utils'
import { BrowserWindow } from 'electron'

import { useStorage } from '@/hooks/storage'

import { initWatch } from '../utils'
import { usePluginConfig } from './config'

export const initWindow = () => {
  const storages = useStorage()
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
    (window) => window.title === name,
  )
  if (exist) {
    return exist.focus()
  }

  const config = usePluginConfig(name)
  const storage = useStorage(name)
  const control = storage.get('control')
  const window = new BrowserWindow({
    x: control?.x,
    y: control?.y,

    width: config.width,
    height: config.height,

    title: name,

    frame: false,
    resizable: false,
    hasShadow: false,
    transparent: true,
    skipTaskbar: true,
    fullscreenable: false,

    alwaysOnTop: control?.top,

    vibrancy: 'hud',
    visualEffectState: 'active',

    webPreferences: {
      scrollBounce: true,
      preload: join(__dirname, '../preload/index.js'),
    },
  })

  initWatch({ name, window })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    window.loadURL(process.env['ELECTRON_RENDERER_URL'] + '#' + name)
  } else {
    window.loadFile(join(__dirname, '../renderer/index.html'), { hash: name })
  }
}
