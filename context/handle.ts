import type { BrowserWindow } from 'electron'
import { ipcMain } from 'electron'

import type { PluginStorage } from './interface'

interface HandleOptions {
  name: string
  window: BrowserWindow
  storage: PluginStorage
}

export const initHandle = async (options: HandleOptions) => {
  const { name, window, storage } = options

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

  ipcMain.handle('set-plugin-position', (_, [x, y]) => {
    const [_x, _y] = window.getPosition()
    window.setPosition(x + _x, y + _y)
  })

  ipcMain.handle('get-plugin-data', async (_, key) => await storage.get(key))
  ipcMain.handle(
    'set-plugin-data',
    async (_, key, value) => await storage.set(key, value),
  )
  ipcMain.handle(
    'remove-plugin-data',
    async (_, key) => await storage.remove(key),
  )
  ipcMain.handle('clear-plugin-data', async () => await storage.clear())
}
