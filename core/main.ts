import { app } from 'electron'

import { initTray } from './tray'
import { createWindow } from './window'

const guide = {
  name: 'guide',
  x: 0,
  y: 0,
  top: false,
  theme: 'light',
  size: [2, 2],
}

app.on('ready', () => {
  initTray()
  createWindow(guide)
})
