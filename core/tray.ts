import trayIcon from '~/public/image/tray.png?asset'

import { getTray } from './global'

export const initTray = async () => {
  console.log(trayIcon)
  getTray(trayIcon)
}
