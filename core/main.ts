import { app } from 'electron'

import { initStorage } from './storage'
import { initTray } from './tray'
import { createWindow } from './window'

const guide = {
  name: 'guide',
  x: 0,
  y: 0,
  size: [200, 200],
}

app.on('ready', () => {
  initTray()
  initStorage()
  createWindow(guide)
})
