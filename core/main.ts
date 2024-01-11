import { app, BrowserWindow } from 'electron'

import { initStorage } from './modules/storage'
import { initTray } from './modules/tray'
import { createWindow, initWindow } from './modules/window'
import { initHandle } from './utils/handle'
import { initBoot, initLock, initShortcut } from './utils/utils'

app.on('ready', async () => {
  initLock()
  initBoot()
  await initStorage()
  initTray()
  initHandle()
  initWindow()
  initShortcut()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow('guide')
  }
})

app.on('window-all-closed', () => {})
