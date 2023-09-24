import { BrowserWindow, globalShortcut } from 'electron'

import { focusApp } from './method'
import { createWindow } from './window'

export const initShortcut = () => {
  globalShortcut.register('CommandOrControl+Shift+m', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow('guide')
    } else {
      focusApp()
    }
  })
}
