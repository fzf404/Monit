import type { MenuItem } from 'electron'
import { BrowserWindow, Menu, nativeImage, shell, Tray } from 'electron'

import pkg from '~/package.json'
import trayIcon from '~/public/image/tray.png?asset'

import { getAllPluginConfigs } from './config'
import {
  focusApp,
  getAppBoot,
  getAppLocale,
  quitApp,
  resetApp,
  restartApp,
  setAppBoot,
  setAppLocale,
} from './method'
import { getAllPluginStorages } from './storage'
import { createWindow } from './window'

let tray: Tray

export const initMenu = () => {
  const configs = getAllPluginConfigs()
  const plugins = Object.keys(configs)
  const storages = getAllPluginStorages()
  const english = getAppLocale() === 'en'
  const menu = Menu.buildFromTemplate([
    {
      label: `👀 Monit ${pkg.version}`,
      click: () => {
        shell.openExternal('https://monit.fzf404.art/')
      },
    },
    { type: 'separator' },
    {
      label: `📝 ${english ? 'Plugin List' : '插件列表'}`,
      submenu: plugins.map((name) => {
        return {
          label: `${configs[name].emoji} ${configs[name].name}: ${
            english
              ? configs[name].description.en
              : configs[name].description.cn
          } `,
          click: () => {
            createWindow(name)
          },
        }
      }),
    },
    {
      label: `♻️ ${english ? 'Plugin Boot' : '插件自启'}`,
      submenu: plugins.map((name) => {
        return {
          label: `${configs[name].emoji} ${configs[name].name}: ${
            english
              ? configs[name].description.en
              : configs[name].description.cn
          } `,
          type: 'checkbox' as const,
          checked: storages[name].get('control')?.boot,
          click: (event: MenuItem) => {
            event.checked && setAppBoot(true)

            storages[name].set('control', {
              boot: event.checked,
            })
            BrowserWindow.getAllWindows()
              .find((win) => win.title === 'manage')
              ?.webContents.send('set-plugin-boot', name, event.checked)
          },
        }
      }),
    },
    { type: 'separator' },
    {
      label: `🌐 ${english ? 'Language' : '语言'}`,
      submenu: [
        {
          label: `🇨🇳 ${english ? 'Chinese' : '中文'}`,
          type: 'radio',
          checked: !english,
          click: async () => {
            await setAppLocale('cn')
            initMenu()
          },
        },
        {
          label: `🇺🇸 ${english ? 'English' : '英文'}`,
          type: 'radio',
          checked: english,
          click: async () => {
            await setAppLocale('en')
            initMenu()
          },
        },
      ],
    },
    {
      label: `🚀 ${english ? 'Boot' : '自启'}`,
      submenu: [
        {
          label: `🟢 ${english ? 'On' : '开启'}`,
          type: 'radio',
          checked: getAppBoot(),
          click: () => {
            setAppBoot(true)
          },
        },
        {
          label: `🔴 ${english ? 'Off' : '关闭'}`,
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
      label: `🔄 ${english ? 'Restart' : '重启'}`,
      click: () => {
        restartApp()
      },
    },
    {
      label: `⚠️ ${english ? 'Reset' : '重置'}`,
      click: () => {
        resetApp()
      },
    },
    {
      label: `🚫 ${english ? 'Quit' : '退出'}`,
      click: () => {
        quitApp()
      },
    },
  ])

  tray.setContextMenu(menu)
}

export const initTray = () => {
  tray = new Tray(nativeImage.createFromPath(trayIcon))
  tray.on('click', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow('guide')
    } else {
      focusApp()
    }
  })
  initMenu()
}
