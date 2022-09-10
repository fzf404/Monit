/*
 * @Author: fzf404
 * @Date: 2022-05-24 22:06:34
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-09 20:54:53
 * @Description: tary 托盘
 */

import { app, Menu, Tray } from 'electron'

import { pluginList } from '#/plugin'
import pkg from 'root/package.json'
import { cget, cset } from '~/storage'
import { isDebug } from './main'
import { createWindow } from './window'

// 托盘全局变量
let TrayMenu

// 初始化托盘菜单
const initMenu = () => {
  // 自启动列表
  let openPlugins = cget('_config', 'open', [])

  // 生产模式插件列表
  const enablePlugins = pluginList.filter(({ debug }) => !(!isDebug && debug))

  // 托盘菜单
  const contextMenu = Menu.buildFromTemplate([
    { label: `Monit - ${pkg.version}` },
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
            enablePlugins.map((item) => createWindow(item.name))
          },
        },
        // 分割线
        { type: 'separator' },
        // 全部插件列表
        ...enablePlugins.map((item) => {
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
              '_config',
              'open',
              enablePlugins.map((item) => item.name)
            )
            initMenu()
          },
        },
        // 分割线
        { type: 'separator' },
        // 全部插件列表
        ...enablePlugins.map((item) => {
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
              cset('_config', 'open', openPlugins)
            },
          }
        }),
        // 分割线
        { type: 'separator' },
        {
          label: '全部关闭自启',
          click: () => {
            cset('_config', 'open', [])
            initMenu()
          },
        },
      ],
    },
    // 分割线
    { type: 'separator' },
    // TODO 应用自启
    {
      label: '开机自启',
      click: () => {
        app.setLoginItemSettings({ openAtLogin: true })
      },
    },
    // 退出应用
    { label: '退出', click: () => app.quit() },
    // 重启应用
    // {
    //   label: '重启',
    //   click: () => {
    //     app.relaunch()
    //     app.exit()
    //   },
    // },
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
