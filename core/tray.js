/*
 * @Author: fzf404
 * @Date: 2022-05-24 22:06:34
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-10-03 18:32:40
 * @Description: tary 托盘
 */

import { app, Menu, shell, Tray } from 'electron'

import { pluginList } from '#/plugin'
import { cget, cset, store } from '~/storage'
import { createWindow } from './window'

import pkg from 'root/package.json'

// 托盘全局变量
let TrayMenu

// 初始化托盘菜单
const initMenu = () => {
  // 自启动列表
  let openPlugins = cget('config', 'open', [])

  // 托盘菜单
  const contextMenu = Menu.buildFromTemplate([
    { label: `Monit - ${pkg.version}` },
    // 分割线
    { type: 'separator' },
    // 全部插件列表
    {
      label: '插件列表',
      // 全部插件列表
      submenu: [
        // 开启全部插件
        {
          label: '全部开启',
          click: () => {
            pluginList.map((item) => createWindow(item.name))
          },
        },
        // 分割线
        { type: 'separator' },
        // 全部插件列表
        ...pluginList.map((item) => {
          return {
            label: `${item.name} - ${item.description}`,
            click: () => {
              // 创建窗口
              createWindow(item.name)
            },
          }
        }),
      ],
    },
    // 插件自启菜单
    {
      label: '插件自启',
      submenu: [
        // 自启全部插件
        {
          label: '全部自启',
          click: () => {
            cset(
              'config',
              'open',
              pluginList.map((item) => item.name)
            )
            initMenu()
          },
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
              cset('config', 'open', openPlugins)
            },
          }
        }),
        // 分割线
        { type: 'separator' },
        {
          label: '全部关闭',
          click: () => {
            cset('config', 'open', [])
            initMenu()
          },
        },
      ],
    },
    // 分割线
    { type: 'separator' },

    // 开机自启
    {
      label: '开机自启',
      click: () => {
        app.setLoginItemSettings({ openAtLogin: true })
      },
    },
    // 插件设置
    {
      label: '插件设置',
      click: () => {
        createWindow('config')
      },
    },
    // 打开官网
    {
      label: '前往官网',
      click: () => {
        shell.openExternal('https://monit.fzf404.art')
      },
    },
    // 分割线
    { type: 'separator' },
    // 重置应用
    {
      label: '重置应用',
      click: () => {
        store.clear()
        app.relaunch()
        app.quit()
      },
    },
    {
      label: '重启',
      click: () => {
        app.relaunch()
        app.quit()
      },
    },
    // 退出应用
    { label: '退出', click: () => app.quit() },
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
