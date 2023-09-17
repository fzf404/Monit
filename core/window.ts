import { join } from 'node:path'

import { is } from '@electron-toolkit/utils'
import { BrowserWindow, nativeTheme } from 'electron'

import { initHandle } from '~/context/handle'

import { useStorage } from './storage'
import { initWatch } from './watch'

const list = import.meta.glob('../app/plugins/**/config.ts')
const plugins = {}
for (const path in list) {
  const name = path.match(/\.\.\/app\/plugins\/(.*)\/config\.ts/)![1]
  plugins[name] = list[path]
}

export const createWindow = async (name: string) => {
  const storage = await useStorage(name)
  const plugin = await plugins[name]()
  const config = storage.get('config')
  const window = new BrowserWindow({
    x: config?.x,
    y: config?.y,
    width: plugin.default.width,
    height: plugin.default.height,

    title: `Monit - ${name}`,

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

  initWatch({ name, window, storage })
  initHandle({ name, window, storage })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    window.loadURL(process.env['ELECTRON_RENDERER_URL']!)
  } else {
    window.loadFile(join(__dirname, '../renderer/index.html'), { hash: name })
  }
}
