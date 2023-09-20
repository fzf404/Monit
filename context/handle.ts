import { ipcMain } from 'electron'

import { getPluginConfig, getPluginStorage } from '~/core/global'

import type { PluginOptions } from './interface'

export const initHandle = ({ name, window }: PluginOptions) => {
  const config = getPluginConfig(name)
  const storage = getPluginStorage(name)
  ipcMain.handle('get-platform', () => process.platform)
  ipcMain.handle('get-plugin-name', () => name)
  ipcMain.handle('get-plugin-size', () => window.getSize())
  ipcMain.handle('get-plugin-top', () => window.isAlwaysOnTop())

  ipcMain.handle('set-plugin-focus', () => window.focus())
  ipcMain.handle('set-plugin-close', () => window.close())
  ipcMain.handle('set-plugin-reload', () => window.reload())
  ipcMain.handle('set-plugin-minimize', () => window.minimize())
  ipcMain.handle('set-plugin-theme', (_, theme) => window.setVibrancy(theme))
  ipcMain.handle('set-plugin-sticky', (_, state) =>
    window.setAlwaysOnTop(state),
  )
  ipcMain.handle('set-plugin-position', (_, [_x, _y]) => {
    const { x, y, width, height } = window.getBounds()
    window.setBounds({
      x: x + _x + width - config.width,
      y: y + _y + height - config.height,
      width: config.width,
      height: config.height,
    })
  })

  ipcMain.handle('get-plugin-data', (_, key) => storage.get(key))
  ipcMain.handle(
    'set-plugin-data',
    async (_, key, value) => await storage.set(key, value),
  )
}
