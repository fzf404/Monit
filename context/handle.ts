import type { BrowserWindow } from 'electron'
import { ipcMain } from 'electron'
import type { LowSync } from 'lowdb'

import type { PluginConfig } from './interface'

interface HandleOptions {
  name: string
  window: BrowserWindow
  storage?: LowSync<Record<string, PluginConfig>>
}

export const initHandle = (options: HandleOptions) => {
  const { name, window } = options
  ipcMain.handle('plugin-name', () => name)
  ipcMain.handle('plugin-size', () => window.getSize())
  ipcMain.handle('plugin-focus', () => window.focus())
  ipcMain.handle('plugin-close', () => window.close())
  ipcMain.handle('plugin-reload', () => window.reload())
  ipcMain.handle('plugin-minimize', () => window.minimize())
  ipcMain.handle('plugin-top', () => window.isAlwaysOnTop())
  ipcMain.handle('plugin-theme', (_, theme) => window.setVibrancy(theme))
  ipcMain.handle('plugin-sticky', (_, state) => window.setAlwaysOnTop(state))
  ipcMain.handle('plugin-move', (_, [x, y]) => {
    const [_x, _y] = window.getPosition()
    window.setPosition(x + _x, y + _y)
  })
}
