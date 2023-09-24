import { is } from '@electron-toolkit/utils'
import { app } from 'electron'

import { focusApp } from './method'

export const initLock = () => {
  if (!is.dev && !app.requestSingleInstanceLock()) {
    app.quit()
  }

  app.on('second-instance', () => {
    focusApp()
  })
}
