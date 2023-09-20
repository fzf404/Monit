import type { MenuItem } from 'electron'
import { Menu, nativeImage, shell, Tray } from 'electron'

import pkg from '~/package.json'
import trayIcon from '~/public/image/tray.png?asset'

import { getPluginConfigs, getPluginStorages, getTray } from './global'
import {
  getAppBoot,
  quitApp,
  resetApp,
  restartApp,
  setAppBoot,
  setAppLocale,
} from './method'
import { createWindow } from './window'

const initMenu = (tray: Tray) => {
  const configs = getPluginConfigs()
  const plugins = Object.keys(configs)
  const storages = getPluginStorages()
  // build tray menu
  const menu = Menu.buildFromTemplate([
    {
      label: `👀 - Monit - ${pkg.version}`,
      click: () => {
        shell.openExternal('https://monit.fzf404.art/')
      },
    },
    { type: 'separator' },
    {
      label: '✨ - 插件列表 - Plugins',
      submenu: plugins.map((name) => {
        return {
          label: `${configs[name].emoji} - ${configs[name].description.cn} - ${configs[name].description.en}`,
          click: () => {
            createWindow(name)
          },
        }
      }),
    },
    {
      label: '⏰ - 插件自启 - AutoRun',
      submenu: [
        {
          label: '♻️ - 刷新列表 - Refresh',
          click: () => {
            initMenu(tray)
          },
        },
        { type: 'separator' },
        ...plugins.map((name) => {
          return {
            label: `${configs[name].emoji} - ${configs[name].description.cn} - ${configs[name].description.en}`,
            type: 'checkbox' as const,
            checked: storages[name].config?.boot,
            click: (event: MenuItem) => {
              storages[name].set('config', {
                boot: event.checked,
              })
            },
          }
        }),
      ],
    },
    { type: 'separator' },
    {
      label: '🌐 - 语言 - Language',
      submenu: [
        {
          label: '🇨🇳 - 中文 - Chinese',
          type: 'radio',
          checked: storages['guide'].config?.locale === 'cn',
          click: () => {
            setAppLocale('cn')
          },
        },
        {
          label: '🇺🇸 - 英文 - English',
          type: 'radio',
          checked: storages['guide'].config?.locale === 'en',
          click: () => {
            setAppLocale('en')
          },
        },
      ],
    },
    {
      label: '🚀 - 自启 - Boot',
      submenu: [
        {
          label: '🟢 - 开启 - On',
          type: 'radio',
          checked: getAppBoot(),
          click: () => {
            setAppBoot(true)
          },
        },
        {
          label: '🔴 - 关闭 - Off',
          type: 'radio',
          checked: !getAppBoot(),
          click: () => {
            setAppBoot(false)
          },
        },
      ],
    },
    { type: 'separator' },
    {
      label: '🔄 - 重启 - Restart',
      click: () => {
        restartApp()
      },
    },
    {
      label: '⚠️ - 重置 - Reset',
      click: () => {
        resetApp()
      },
    },
    {
      label: '🚫 - 退出 - Quit',
      click: () => {
        quitApp()
      },
    },
  ])

  tray.setContextMenu(menu)
}

export const initTray = () => {
  // get global tray
  let tray = getTray()
  // create tary icon
  tray = new Tray(nativeImage.createFromPath(trayIcon))
  // init tray menu
  initMenu(tray)
}
