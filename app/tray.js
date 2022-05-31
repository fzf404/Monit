/*
 * @Author: fzf404
 * @Date: 2022-05-24 22:06:34
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-05-31 17:16:08
 * @Description: 托盘图标
 */

import { app, Tray, Menu } from 'electron'

import { cget, cset } from '../common/storage'
import { pluginList } from '../common/plugin'
import { createWindow } from './window'

// 托盘全局变量
let TrayMenu

// 插件启动列表
let openPlugins = cget('_config', 'open', [])

// 全部插件菜单
const pluginMenu = pluginList.map(({ name }) => {
  return {
    label: name,
    click: () => {
      // 创建窗口
      createWindow(name)
    },
  }
})

// 自启动插件菜单
const pluginOpen = pluginList.map(({ name }) => {
  return {
    label: name,
    type: 'checkbox',
    checked: openPlugins.includes(name),
    click: () => {
      // 切换插件自启动状态
      const index = openPlugins.indexOf(name)
      if (index > -1) {
        openPlugins.splice(index, 1)
      } else {
        openPlugins.push(name)
      }
      // 保存插件自启动状态
      cset('_config', 'open', openPlugins)
    },
  }
})

// 初始化托盘
export const initTray = () => {
  TrayMenu = new Tray(__static + '/icon.png')

  // 托盘菜单
  const contextMenu = Menu.buildFromTemplate([
    { label: '插件列表', submenu: pluginMenu },
    { label: '插件自启', submenu: pluginOpen },
    { type: 'separator' }, // 分割线
    {
      label: '开机自启',
      type: 'checkbox',
      checked: app.getLoginItemSettings.openAtLogin,
      click: () => {
        const open = app.getLoginItemSettings.openAtLogin
        app.setLoginItemSettings({ openAtLogin: !open })
      },
    },
    { label: '退出', click: () => app.exit() },
  ])

  TrayMenu.setContextMenu(contextMenu)
}
