import { join } from 'node:path'

import { is } from '@electron-toolkit/utils'
import { BrowserWindow, nativeTheme } from 'electron'

import { initHandle } from '~/context/handle'

import { getPluginConfig, getPluginStorage } from './global'
import { initWatch } from './watch'

export const createWindow = (name: string) => {
  const plugin = getPluginConfig(name)
  const storage = getPluginStorage(name).get('config')
  const window = new BrowserWindow({
    x: storage?.x,
    y: storage?.y,

    width: plugin.width,
    height: plugin.height,

    title: `Monit - ${name}`,

    frame: false,
    resizable: false,
    hasShadow: false,
    transparent: true,
    skipTaskbar: true,
    fullscreenable: false,

    alwaysOnTop: storage?.sticky,

    vibrancy:
      storage?.theme ?? (nativeTheme.shouldUseDarkColors ? 'dark' : 'light'),
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
