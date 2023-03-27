/*
 * @Author: fzf404
 * @Date: 2022-05-24 22:06:34
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-27 18:09:46
 * @Description: tary 初始化
 */
import { app, Menu, Tray } from 'electron'

import { pluginList } from '~/config/plugin'
import { get, set } from '~/lib/storage'
import { openURL, resetApp, restartApp } from '~/server/app'
import { bootWin, createWin } from '~/server/window'

import { checkUpdate } from './update'

// 托盘全局变量
let TrayMenu

// 初始化托盘菜单
const initMenu = () => {
  // 自启动列表
  const openPlugins = get('config', 'open', [])

  // 托盘菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: `Monit - ${app.getVersion()}`,
      click: () => openURL('https://monit.fzf404.art')
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
          click: () => createWin(pluginList.map((item) => item.name))
        },
        // 分割线
        { type: 'separator' },
        // 插件列表
        ...pluginList.map((item) => {
          return {
            label: `${item.name} - ${item.description}`,
            click: () => createWin(item.name)
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
          click: () => bootWin(true)
        },
        // 分割线
        { type: 'separator' },
        // 全部插件列表
        ...pluginList.map((item) => {
          return {
            label: `${item.name} - ${item.description}`,
            type: 'checkbox',
            checked: openPlugins.includes(item.name),
            click: () => {
              // 查找插件是否自启
              const index = openPlugins.indexOf(item.name)
              // 切换插件自启动状态
              if (index > -1) {
                openPlugins.splice(index, 1)
              } else {
                openPlugins.push(item.name)
              }
              // 保存插件自启动状态
              set('config', 'open', openPlugins)
            }
          }
        }),
        // 分割线
        { type: 'separator' },
        {
          label: '全部关闭',
          click: () => {
            set('config', 'open', [])
            initMenu()
          }
        }
      ]
    },
    // 分割线
    { type: 'separator' },
    // 开机自启
    {
      label: '开机自启',
      click: () => {
        app.setLoginItemSettings({ openAtLogin: true })
      }
    },
    // 插件设置
    {
      label: '插件设置',
      click: () => {
        createWin('config')
      }
    },
    // 检查更新
    {
      label: '检查更新',
      click: () => checkUpdate()
    },
    // 分割线
    { type: 'separator' },
    // 重置应用
    {
      label: '重置',
      click: () => resetApp()
    },
    {
      label: '重启',
      click: () => restartApp()
    },
    // 退出应用
    { label: '退出', click: () => app.quit() }
  ])

  // 设置托盘菜单
  TrayMenu.setContextMenu(contextMenu)
}

// 初始化托盘
export const initTray = () => {
  // 托盘 Logo
  const trayLogo = process.platform === 'darwin' ? `${__static}/icons/tray.png` : `${__static}/icons/icon.png`
  // 托盘提示
  const trayTip = 'Monit'
  // 初始化托盘
  TrayMenu = new Tray(trayLogo)
  // 设置托盘提示
  TrayMenu.setToolTip(trayTip)

  // 初始化托盘菜单
  initMenu()
}
