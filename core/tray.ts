import { Menu } from 'electron'

import trayIcon from '~/public/image/tray.png?asset'

import { getTray } from './global'
import { quitApp, resetApp, restartApp } from './method'

export const initTray = () => {
  const tray = getTray(trayIcon)
  const menu = Menu.buildFromTemplate([
    {
      label: '插件',
      click: () => {
        console.log('插件')
      },
    },
    {
      label: '设置',
      click: () => {
        console.log('设置')
      },
    },
    {
      label: '重置',
      click: () => {
        resetApp()
      },
    },
    {
      label: '重启',
      click: () => {
        restartApp()
      },
    },
    {
      label: '退出',
      click: () => {
        quitApp()
      },
    },
  ])
  tray.setContextMenu(menu)
}
