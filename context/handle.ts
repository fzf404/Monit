import { BrowserWindow, ipcMain } from 'electron'

const initHandle = (name: string, window: BrowserWindow) => {
  ipcMain.handle('getPluginName', () => name)
  ipcMain.handle('closePlugin', () => window.close())
}

export { initHandle }
