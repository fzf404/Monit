import { Menu, nativeImage, shell, Tray } from 'electron'

import pkg from '~/package.json'
import trayIcon from '~/public/image/tray.png?asset'

import { getPluginStorage, getTray } from './global'
import {
  getAppBoot,
  quitApp,
  resetApp,
  restartApp,
  setAppBoot,
  setAppLocale,
} from './method'

export const initTray = () => {
  // get global tray
  let tray = getTray()
  // create tary icon
  tray = new Tray(nativeImage.createFromPath(trayIcon))
  // build tray menu
  const menu = Menu.buildFromTemplate([
    {
      label: `Monit - ${pkg.version}`,
      click: () => {
        shell.openExternal('https://monit.fzf404.art/')
      },
    },
    { type: 'separator' },
    {
      label: '自启 - Boot',
      submenu: [
        {
          label: '开启 - On',
          type: 'checkbox',
          checked: getAppBoot(),
          click: () => {
            setAppBoot(true)
          },
        },
        {
          label: '关闭 - Off',
          type: 'checkbox',
          checked: !getAppBoot(),
          click: () => {
            setAppBoot(false)
          },
        },
      ],
    },
    {
      label: '语言 - Language',
      submenu: [
        {
          label: '中文 - Chinese',
          type: 'checkbox',
          checked: getPluginStorage('guide').config?.locale === 'cn',
          click: () => {
            setAppLocale('cn')
          },
        },
        {
          label: '英文 - English',
          type: 'checkbox',
          checked: getPluginStorage('guide').config?.locale === 'en',
          click: () => {
            setAppLocale('en')
          },
        },
      ],
    },
    { type: 'separator' },
    {
      label: '重启 - Restart',
      click: () => {
        restartApp()
      },
    },
    {
      label: '重置 - Reset',
      click: () => {
        resetApp()
      },
    },
    {
      label: '退出 - Quit',
      click: () => {
        quitApp()
      },
    },
  ])
  tray.setContextMenu(menu)
}
