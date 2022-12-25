/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2022-12-25 17:02:29
 * @Description: main 入口
 */
import { app, BrowserWindow, protocol } from 'electron'

import { initIPC } from '#/event'
import { initTray } from './tray'
import { ckeckUpdate, initDevtools, initShortcut } from './utils'
import { createWindow, initWindow } from './window'

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

  // 初始化 IPC 事件监听
  initIPC()

  // 安装 Vue Devtools
  initDevtools()

  // 初始化自启动窗口
  initWindow()

  // 初始化快捷键
  initShortcut()

  // 检查更新
  ckeckUpdate()
})

// 激活窗口
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow('welcome')
  }
})

// 阻止托盘退出
app.on('window-all-closed', () => {})
