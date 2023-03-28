/*
 * @Author: fzf404
 * @Date: 2022-05-24 22:06:34
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-28 21:59:41
 * @Description: tary 初始化
 */
import { app, Menu, Tray } from 'electron'

import { checkUpdate } from './update'

import { pluginList } from '~/config/plugin'
import { get } from '~/lib/storage'
import { bootApp, getVersion, quitApp, resetApp, restartApp } from '~/server/app'
import { bootPlugin, createPlugin } from '~/server/plugin'
import { openURL, sendConfirm } from '~/server/utils'

// 托盘全局变量
let TrayMenu: Tray

// 初始化托盘菜单
const initMenu = () => {
  // 自启动列表
  const bootPlugins = get('config', 'boot', []) as Array<string>
  const pluginNames = pluginList.map((item) => item.name)

  // 托盘菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: `Monit - ${getVersion()}`,
      click: () => openURL('https://monit.fzf404.art/')
    },
    // 分割线
    { type: 'separator' },
    // 插件列表
    {
      label: '插件列表',
      // 插件列表
      submenu: [
        // 全部开启
        {
          label: '全部开启',
          click: () => createPlugin(pluginNames)
        },
        // 分割线
        { type: 'separator' },
        // 插件列表
        ...pluginList.map((item) => {
          return {
            label: `${item.name} - ${item.description}`,
            click: () => createPlugin(item.name)
          }
        })
      ]
    },
    // 插件自启
    {
      label: '插件自启',
      submenu: [
        // 全部自启
        {
          label: '全部自启',
          click: () => {
            // 设置自启动列表
            bootPlugin(pluginNames, true)
            // 重置菜单
            initMenu()
          }
        },
        // 分割线
        { type: 'separator' },
        // 全部插件列表
        ...pluginList.map((item) => {
          return {
            label: `${item.name} - ${item.description}`,
            type: 'checkbox' as const,
            checked: bootPlugins.includes(item.name),
            click: () => {
              // 查找插件是否自启
              const index = bootPlugins.indexOf(item.name)
              // 切换插件自启动状态
              if (index > -1) {
                bootPlugin(item.name, false)
              } else {
                bootPlugin(item.name, true)
              }
            }
          }
        }),
        // 分割线
        { type: 'separator' },
        {
          label: '全部关闭',
          click: () => {
            // 设置自启动列表
            bootPlugin(pluginNames, false)
            // 重置菜单
            initMenu()
          }
        }
      ]
    },
    // 刷新插件状态
    {
      label: '刷新列表',
      click: () => {
        initMenu()
      }
    },
    // 分割线
    { type: 'separator' },
    // 开机自启
    {
      label: '开机自启',
      type: 'checkbox',
      checked: app.getLoginItemSettings().openAtLogin,
      click: () => {
        // 切换开机自启
        bootApp(!app.getLoginItemSettings().openAtLogin)
      }
    },
    // 检查更新
    {
      label: '检查更新',
      click: () => checkUpdate(false)
    },
    // 分割线
    { type: 'separator' },
    // 重置应用
    {
      label: '重置',
      click: () => sendConfirm('reset', '请确认重置应用！', () => resetApp)
    },
    {
      label: '重启',
      click: () => restartApp()
    },
    // 退出应用
    { label: '退出', click: () => quitApp() }
  ])

  // 设置托盘菜单
  TrayMenu.setContextMenu(contextMenu)
}

// 初始化托盘
export const initTray = () => {
  // 托盘 Logo
  const trayLogo = process.platform === 'darwin' ? `${__static}/img/tray.png` : `${__static}/img/icon.png`
  // 托盘提示
  const trayTip = 'Monit'
  // 初始化托盘
  TrayMenu = new Tray(trayLogo)
  // 设置托盘提示
  TrayMenu.setToolTip(trayTip)

  // 初始化托盘菜单
  initMenu()
}
