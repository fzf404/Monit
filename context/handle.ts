import { BrowserWindow, ipcMain } from 'electron'

interface HandleOptions {
  name: string
  window: BrowserWindow
}

const initHandle = (options: HandleOptions) => {
  const { name, window } = options
  ipcMain.handle('plugin-name', () => name)
  ipcMain.handle('plugin-focus', () => window.focus())
  ipcMain.handle('plugin-close', () => window.close())
  ipcMain.handle('plugin-reload', () => window.reload())
  ipcMain.handle('plugin-minimize', () => window.minimize())
  ipcMain.handle('plugin-top', () => window.isAlwaysOnTop())
  ipcMain.handle('plugin-sticky', (_, state) => window.setAlwaysOnTop(state))
}

export { initHandle }
