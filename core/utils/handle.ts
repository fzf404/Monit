import { BrowserWindow, ipcMain, shell } from 'electron'

import { useStorage } from '@/hooks/storage'
import { getPluginConfig } from '@/modules/config'
import { initMenu } from '@/modules/tray'
import { createWindow } from '@/modules/window'

import { getLocale, setAppBoot } from './method'

const getWindow = (event: Electron.IpcMainInvokeEvent) => {
  return BrowserWindow.fromWebContents(event.sender) as BrowserWindow
}

export const initHandle = () => {
  ipcMain.handle('get-locale', getLocale)
  ipcMain.handle('get-platform', () => process.platform)

  ipcMain.handle('get-plugin-top', (event) => getWindow(event).isAlwaysOnTop())
  ipcMain.handle('get-plugin-storage-data', (event, key) => {
    const storage = useStorage(getWindow(event).title)
    return storage.get(key)
  })
  ipcMain.handle('get-plugin-boot', (_, name) => {
    const storage = useStorage(name)
    return storage.get('control')?.boot
  })

  ipcMain.handle('set-plugin-close', (event) => getWindow(event).close())
  ipcMain.handle('set-plugin-minimize', (event) => getWindow(event).minimize())
  ipcMain.handle('set-plugin-theme', (event, theme) =>
    getWindow(event).setVibrancy(theme),
  )
  ipcMain.handle('set-plugin-sticky', (event, state) =>
    getWindow(event).setAlwaysOnTop(state),
  )
  ipcMain.handle('set-plugin-storage-data', async (event, key, value) => {
    const storage = useStorage(getWindow(event).title)
    await storage.set(key, value)
  })
  ipcMain.handle('set-plugin-boot', async (_, name, state) => {
    state && setAppBoot(true)
    const storage = useStorage(name)
    await storage.set('control', { boot: state })
    initMenu()
  })
  ipcMain.handle('set-plugin-position', (event, [_x, _y]) => {
    const window = getWindow(event)
    const config = getPluginConfig(window.title)
    const { x, y, width, height } = window.getBounds()
    window.setBounds({
      x: x + _x + width - config.width,
      y: y + _y + height - config.height,
      width: config.width,
      height: config.height,
    })
  })

  ipcMain.handle('open-url', (_, url) => {
    shell.openExternal(url)
  })
  ipcMain.handle('open-plugin', (_, name) => {
    createWindow(name)
  })
  ipcMain.handle('refresh-plugin', (event) => {
    getWindow(event).reload()
  })
}
