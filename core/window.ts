import { BrowserWindow } from 'electron'
import { is } from '@electron-toolkit/utils'

import { MeshSize } from './global'

interface WindowOptions {
  name: string
  x: number
  y: number
  top: boolean
  theme: string
  size: number[]
}

const createWindow = (options: WindowOptions): BrowserWindow => {
  const win = new BrowserWindow({
    title: options.name,
    // x: options.x,
    // y: options.y,
    width: options.size[0] * MeshSize,
    height: options.size[1] * MeshSize,
    alwaysOnTop: options.top,

    frame: false,
    resizable: false,
    hasShadow: false,
    transparent: true,
    skipTaskbar: true,
    fullscreenable: false,

    vibrancy: 'light',
    visualEffectState: 'active',

    webPreferences: {
      preload: '../preload/index.js',
    },
  })

  if (is.dev) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL']! + '#/' + options.name)
  } else {
    win.loadFile('../renderer/index.html#/' + options.name)
  }

  return win
}

export { createWindow }
