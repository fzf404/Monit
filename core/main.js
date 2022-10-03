/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-10-02 21:56:06
 * @Description: main 入口
 */

import { app, BrowserWindow, protocol } from 'electron'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { autoUpdater } from 'electron-updater'

import { initIPC } from '#/event'
import { initTray } from './tray'
import { createWindow, initWindow } from './window'

// 调试模式
const isDebug = process.env.NODE_ENV === 'development'

// 注册协议
protocol.registerSchemesAsPrivileged([{ scheme: 'monit', privileges: { secure: true, standard: true } }])

// 准备就绪
app.on('ready', async () => {
  // 初始化系统托盘
  initTray()

  // 初始化 IPC 事件监听
  initIPC()

  // 初始化自启动窗口
  initWindow()

  // TODO 初始化快捷键监听
  // initShortcut()

  // TODO 检查更新
  if (!isDebug)
    autoUpdater.checkForUpdatesAndNotify({
      title: 'Monit - update',
      body: '已下载新版本，将会在软件关闭后自动更新。',
    })
})

// 调试模式下安装 vue-devtools
app.on('ready', () => {
  if (isDebug) {
    try {
      installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools 安装失败：', e.toString())
    }
  }
})

// 激活窗口
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow('welcome')
  }
})

// 阻止托盘退出
app.on('window-all-closed', () => {})
