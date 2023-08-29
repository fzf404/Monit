import { BrowserWindow, ipcMain } from 'electron'

interface HandleOptions {
  name: string
  window: BrowserWindow
}

const initHandle = ({ name, window }: HandleOptions) => {
  ipcMain.handle('plugin.name', () => name)
  ipcMain.handle('plugin.window', () => window.close())
}

export { initHandle }
