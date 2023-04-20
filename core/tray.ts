/*
 * @Author: fzf404
 * @Date: 2022-05-24 22:06:34
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-21 00:36:18
 * @Description: tary 初始化
 */
import { BrowserWindow, Menu, Tray } from 'electron'

import { checkUpdate } from './update'

import { pluginList } from '~/config/plugin'
import { get } from '~/lib/storage'
import { bootApp, bootState, getVersion, openConfig, quitApp, resetApp, restartApp } from '~/server/app'
import { bootPlugin, createPlugin, focusAllPlugin } from '~/server/plugin'
import { openURL, sendConfirm } from '~/server/system'

// 托盘全局变量
let TrayMenu: Tray

// 初始化托盘菜单
const initMenu = () => {
  // 自启动列表
  const bootPlugins = get('config', 'boot', []) as Array<string>

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
        // 分割线
        { type: 'separator' },
        // 插件列表
        ...pluginList.map((item) => {
          return {
            label: `${item.icon} ${item.name} ${item.description}`,
            click: () => createPlugin(item.name)
          }
        })
      ]
    },
    // 插件自启
    {
      label: '插件自启',
      submenu: [
        // 刷新插件自启状态
        {
          label: '刷新列表',
          click: () => {
            initMenu()
          }
        },
        // 分割线
        { type: 'separator' },
        // 全部插件列表
        ...pluginList.map((item) => {
          return {
            label: `${item.icon} ${item.name} ${item.description}`,
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
        })
      ]
    },
    // 分割线
    { type: 'separator' },
    // 开机自启
    {
      label: '开机自启',
      type: 'checkbox',
      checked: bootState(),
      click: () => {
        // 开机自启切换
        bootApp(!bootState())
      }
    },
    // 检查更新
    {
      label: '检查更新',
      click: () => checkUpdate(false)
    },
    {
      label: '编辑配置',
      click: () => openConfig()
    },
    // 分割线
    { type: 'separator' },
    // 重置应用
    {
      label: '重置',
      click: () => sendConfirm('reset', '请确认重置应用！', () => resetApp())
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
  // TODO sharp 托盘图标
  const trayLogo = process.platform === 'darwin' ? `${__static}/img/tray.png` : `${__static}/img/icon.png`
  // 托盘提示
  const trayTip = 'Monit'
  // 初始化托盘
  TrayMenu = new Tray(trayLogo)
  // 设置托盘提示
  TrayMenu.setToolTip(trayTip)

  // 监听托盘事件
  TrayMenu.on('click', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createPlugin('guide')
    } else {
      focusAllPlugin()
    }
  })

  // 初始化托盘菜单
  initMenu()
}
