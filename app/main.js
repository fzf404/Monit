/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-05-30 19:12:30
 * @Description: 应用初始化
 */

import { app, protocol, BrowserWindow } from 'electron'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import { autoUpdater } from 'electron-updater'

import { initTray } from './tray'
import { appEvent } from './event'
import { autoWindow, createWindow } from './window'

// 调试模式
const isDevelopment = process.env.NODE_ENV !== 'production'

// 注册协议
protocol.registerSchemesAsPrivileged([{ scheme: 'Monit', privileges: { secure: true, standard: true } }])

// mac 激活窗口
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow('welcome')
  }
})

// mac 关闭窗口
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 准备就绪
app.on('ready', async () => {
  // 初始化系统托盘
  initTray()

  // 应用事件监听
  appEvent()

  // 延时启动窗口 用于修复 Linux 窗口不透明
  setTimeout(() => {
    // 自动打开窗口
    autoWindow()
  }, 300)

  // 自动检查更新
  autoUpdater.checkForUpdatesAndNotify()
})

// 调试模式下安装 vue-devtools
app.on('ready', () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
})

// 调试模式下退出
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
