import { app } from 'electron'

import { initConfig } from './config'
import { initStorage } from './storage'
import { initTray } from './tray'
import { createWindow } from './window'

app.on('ready', async () => {
  await initConfig()
  await initStorage()
  initTray()
  createWindow('guide')
})
