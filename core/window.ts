import { join } from 'node:path'

import { is } from '@electron-toolkit/utils'
import { BrowserWindow, nativeTheme } from 'electron'

import { initHandle } from '~/context/handle'

import { useStorage } from './storage'
import { initWatch } from './watch'

const plugins = {}
const list = import.meta.glob('../app/plugins/**/config.ts')
for (const path in list) {
  const name = path.match(/\.\.\/app\/plugins\/(.*)\/config\.ts/)![1]
  plugins[name] = list[path]
}

export const createWindow = async (name: string) => {
  const storage = await useStorage(name)
  const config = storage.get('config')
  const plugin = (await plugins[name]())!.default
  const window = new BrowserWindow({
    x: config?.x,
    y: config?.y,

    width: plugin.width,
    height: plugin.height,

    title: `Monit - ${name}`,

    frame: false,
    transparent: true,
    skipTaskbar: true,
    fullscreenable: false,

    hasShadow: config?.shadow,
    alwaysOnTop: config?.sticky,
    resizable: config?.resizable,

    vibrancy: nativeTheme.shouldUseDarkColors ? 'dark' : 'light',
    visualEffectState: 'active',

    webPreferences: {
      scrollBounce: true,
      preload: join(__dirname, '../preload/index.js'),
    },
  })

  initWatch({ name, window, plugin, storage })
  initHandle({ name, window, plugin, storage })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    window.loadURL(process.env['ELECTRON_RENDERER_URL']!)
  } else {
    window.loadFile(join(__dirname, '../renderer/index.html'), { hash: name })
  }
}
