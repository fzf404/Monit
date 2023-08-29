import { join } from 'node:path'
import { BrowserWindow } from 'electron'
import { is } from '@electron-toolkit/utils'

import { initHandle } from '~/context/handle'

import { MeshSize } from './global'

interface WindowOptions {
  name: string
  x: number
  y: number
  top: boolean
  theme: string
  size: number[]
}

const createWindow = ({ name, x, y, top, theme, size }: WindowOptions): BrowserWindow => {
  const window = new BrowserWindow({
    x,
    y,
    title: `Monit - ${name}`,
    width: size[0] * MeshSize,
    height: size[1] * MeshSize,
    alwaysOnTop: top,

    frame: false,
    resizable: false,
    hasShadow: false,
    transparent: true,
    skipTaskbar: true,
    fullscreenable: false,

    vibrancy: theme === 'dark' ? 'dark' : 'light',
    visualEffectState: 'active',

    webPreferences: {
      // sandbox: false,
      preload: join(__dirname, '../preload/index.js'),
    },
  })

  initHandle({ name, window })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    window.loadURL(process.env['ELECTRON_RENDERER_URL']!)
  } else {
    window.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return window
}

export { createWindow }
