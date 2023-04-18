/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-17 21:34:40
 * @Description: main 初始化
 */
import { app, BrowserWindow, protocol } from 'electron'

import { initDevtools } from './devtool'
import { initTray } from './tray'
import { checkUpdate } from './update'
import { createBootWindow } from './window'

import { initIPC } from '~/event/handle'
import { createPlugin } from '~/server/plugin'
import { initShortcut } from './shortcut'

// 限制实例个数
if (!app.requestSingleInstanceLock()) {
  app.quit()
}

// 注册协议
protocol.registerSchemesAsPrivileged([{ scheme: 'monit', privileges: { secure: true, standard: true } }])

// 准备就绪
app.on('ready', () => {
  // 初始化系统托盘
  initTray()

  // 初始化事件监听
  initIPC()

  // 安装调试插件
  initDevtools()

  // 初始化快捷键
  initShortcut()
  
  // 初始化自启动窗口
  createBootWindow()

  // 检查更新
  checkUpdate()
})

// 激活窗口
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createPlugin('welcome')
  }
})

// 阻止托盘退出
app.on('window-all-closed', () => {})
