import { app, BrowserWindow } from 'electron'

import { initConfig } from './config'
import { initShortcut } from './shortcut'
import { initStorage } from './storage'
import { initTray } from './tray'
import { createWindow, initWindow } from './window'

app.on('ready', async () => {
  initConfig()
  await initStorage()
  initTray()
  initWindow()
  initShortcut()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow('guide')
  }
})

app.on('window-all-closed', () => {})
