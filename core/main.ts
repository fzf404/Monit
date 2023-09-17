import { app } from 'electron'

import { initStorage } from './storage'
import { initTray } from './tray'
import { createWindow } from './window'

app.on('ready', () => {
  initTray()
  initStorage()
  createWindow('guide')
})
