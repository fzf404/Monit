import { app, BrowserWindow } from 'electron'

import { initHandle } from './handle'
import { initStorage } from './storage'
import { initTray } from './tray'
import { initBoot, initLock, initShortcut } from './utils'
import { createWindow, initWindow } from './window'

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
