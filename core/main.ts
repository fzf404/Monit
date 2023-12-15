/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-20 21:50:21
 * @Description: main 初始化
 */
import { app, BrowserWindow, protocol } from 'electron'

import { initDevtools } from './devtool'
import { initLock } from './locker'
import { initTray } from './tray'
import { checkUpdate } from './update'
import { createBootWindow } from './window'

import { initIPC } from '~/event/handle'
import { createPlugin } from '~/server/plugin'
import { initShortcut } from './shortcut'
import { hook, unhook } from '~/xiohook/hook'

// 初始化应用锁
initLock()

// 注册协议
protocol.registerSchemesAsPrivileged([{ scheme: 'monit', privileges: { secure: true, standard: true } }])

// 准备就绪
app.on('ready', () => {
  hook()
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
    createPlugin('guide')
  }
})

// 阻止托盘退出
app.on('window-all-closed', () => {})

// 应用退出
app.on('quit', () => {
  unhook()
})
