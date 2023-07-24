import { BrowserWindow } from 'electron'
import { is } from '@electron-toolkit/utils'

import { MeshSize } from '~/config/global'

interface WindowOptions {
  name: string
  x: number
  y: number
  top: boolean
  size: number[]
}

export const createWindow = (options: WindowOptions): BrowserWindow => {
  const win = new BrowserWindow({
    title: options.name,
    x: options.x,
    y: options.y,
    width: options.size[0] * MeshSize,
    height: options.size[1] * MeshSize,
    alwaysOnTop: options.top,

    frame: false,
    resizable: false,
    hasShadow: false,
    transparent: true,
    skipTaskbar: true,
    fullscreenable: false,

    vibrancy: 'dark',
    visualEffectState: 'active',

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  })

  if (is.dev) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL']! + '#/' + options.name)
  } else {
    win.loadFile('../renderer/index.html#/' + options.name)
  }

  return win
}
