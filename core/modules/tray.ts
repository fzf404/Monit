import type { MenuItem } from 'electron'
import { BrowserWindow, Menu, nativeImage, shell, Tray } from 'electron'

import { useStorage } from '@/hooks/storage'
import trayIcon from '~/builds/images/tray.png?asset'
import pkg from '~/package.json'

import {
  focusApp,
  getAppBoot,
  getLocale,
  quitApp,
  resetApp,
  restartApp,
  setAppBoot,
  setLocale,
} from '../utils/method'
import { usePluginConfig } from './config'
import { createWindow } from './window'

let TrayMenu: Tray

export const initMenu = () => {
  const appBootState = getAppBoot()
  const pluginConfigs = usePluginConfig()
  const pluginNameList = Object.keys(pluginConfigs)
  const pluginStorages = useStorage()
  const isEnglish = getLocale() === 'en'
  const trayMenu = Menu.buildFromTemplate([
    {
      label: `👀 Monit ${pkg.version}`,
      click: () => {
        shell.openExternal('https://monit.fzf404.art/')
      },
    },
    { type: 'separator' },
    {
      label: `📝 ${isEnglish ? 'Plugin List' : '插件列表'}`,
      submenu: pluginNameList.map((name) => {
        return {
          label: `${pluginConfigs[name].emoji} ${pluginConfigs[name].name}: ${
            isEnglish
              ? pluginConfigs[name].description.en
              : pluginConfigs[name].description.cn
          } `,
          click: () => {
            createWindow(name)
          },
        }
      }),
    },
    {
      label: `♻️ ${isEnglish ? 'Plugin Boot' : '插件自启'}`,
      submenu: pluginNameList.map((name) => {
        return {
          label: `${pluginConfigs[name].emoji} ${pluginConfigs[name].name}: ${
            isEnglish
              ? pluginConfigs[name].description.en
              : pluginConfigs[name].description.cn
          } `,
          type: 'checkbox',
          checked: pluginStorages[name].get('control')?.boot,
          click: (event: MenuItem) => {
            event.checked && setAppBoot(true)

            pluginStorages[name].set('control', {
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
      label: `🌐 ${isEnglish ? 'Language' : '语言'}`,
      submenu: [
        {
          label: `🇨🇳 ${isEnglish ? 'Chinese' : '中文'}`,
          type: 'radio',
          checked: !isEnglish,
          click: async () => {
            await setLocale('cn')
            initMenu()
          },
        },
        {
          label: `🇺🇸 ${isEnglish ? 'English' : '英文'}`,
          type: 'radio',
          checked: isEnglish,
          click: async () => {
            await setLocale('en')
            initMenu()
          },
        },
      ],
    },
    {
      label: `🚀 ${isEnglish ? 'Boot' : '自启'}`,
      submenu: [
        {
          label: `🟢 ${isEnglish ? 'On' : '开启'}`,
          type: 'radio',
          checked: appBootState,
          click: () => {
            setAppBoot(true)
          },
        },
        {
          label: `🔴 ${isEnglish ? 'Off' : '关闭'}`,
          type: 'radio',
          checked: !appBootState,
          click: () => {
            setAppBoot(false)
          },
        },
      ],
    },
    { type: 'separator' },
    {
      label: `🔄 ${isEnglish ? 'Restart' : '重启'}`,
      click: () => {
        restartApp()
      },
    },
    {
      label: `⚠️ ${isEnglish ? 'Reset' : '重置'}`,
      click: () => {
        resetApp()
      },
    },
    {
      label: `🚫 ${isEnglish ? 'Quit' : '退出'}`,
      click: () => {
        quitApp()
      },
    },
  ])

  TrayMenu.setContextMenu(trayMenu)
}

export const initTray = () => {
  TrayMenu = new Tray(nativeImage.createFromPath(trayIcon))
  TrayMenu.on('click', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow('guide')
    } else {
      focusApp()
    }
  })
  initMenu()
}
