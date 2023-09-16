import { join } from 'node:path'

import { is } from '@electron-toolkit/utils'
import { BrowserWindow, nativeTheme } from 'electron'

import { initHandle } from '~/context/handle'

import { useStorage } from './storage'

interface WindowOptions {
  name: string
  size: number[]
}

// const configList = import.meta.glob('@/plugins/**/index.vue')

export const createWindow = async (
  options: WindowOptions,
): Promise<BrowserWindow> => {
  const { name, size } = options
  const storage = await useStorage(name)
  const config = storage.get('config')
  console.log(config)
  const window = new BrowserWindow({
    x: config?.x,
    y: config?.y,
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

  initHandle({ name, window, storage })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    window.loadURL(process.env['ELECTRON_RENDERER_URL']!)
  } else {
    window.loadFile(join(__dirname, '../renderer/index.html'), { hash: name })
  }

  return window
}
