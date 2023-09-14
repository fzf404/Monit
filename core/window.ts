import { join } from 'node:path'
import { BrowserWindow, nativeTheme } from 'electron'
import { is } from '@electron-toolkit/utils'

import { initHandle } from '~/context/handle'

interface WindowOptions {
  name: string
  x: number
  y: number
  size: number[]
}

export const createWindow = (options: WindowOptions): BrowserWindow => {
  const { name, x, y, size } = options
  const window = new BrowserWindow({
    x,
    y,
    title: `Monit - ${name}`,
    width: size[0],
    height: size[1],

    frame: false,
    resizable: false,
    hasShadow: false,
    transparent: true,
    skipTaskbar: true,
    fullscreenable: false,

    vibrancy: nativeTheme.shouldUseDarkColors ? 'dark' : 'light',
    visualEffectState: 'active',

    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
    },
  })

  initHandle({ name, window })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    window.loadURL(process.env['ELECTRON_RENDERER_URL']!)
  } else {
    window.loadFile(join(__dirname, '../renderer/index.html'), { hash: name })
  }

  return window
}
