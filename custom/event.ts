/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-08 18:21:04
 * @Description: event 处理
 */

import { BrowserWindow, ipcMain, Notification, shell } from 'electron'

import { cget, cset } from '~/storage'
import { createWindow } from '../core/window'

// 应用事件
export const appEvent = () => {
  // 开启窗口
  ipcMain.on('window-start', function (event, name) {
    createWindow(name)
  })

  // 关闭窗口
  ipcMain.on('window-close', function (event) {
    // 从事件中获得窗口
    const win = BrowserWindow.fromWebContents(event.sender) as BrowserWindow
    // 关闭窗口
    win.close()
  })

  // 最小化窗口
  ipcMain.on('window-mini', function (event) {
    const win = BrowserWindow.fromWebContents(event.sender) as BrowserWindow
    win.minimize()
  })

  // 置顶窗口
  ipcMain.on('window-top', function (event, state) {
    const win = BrowserWindow.fromWebContents(event.sender) as BrowserWindow
    // 设置置顶
    win.setAlwaysOnTop(state)
  })

  // 发送通知
  ipcMain.on('window-notice', function (event, message) {
    const win = BrowserWindow.fromWebContents(event.sender) as BrowserWindow
    const name = win.title
    // 通知开启状态
    if (cget(name, 'notice', false)) {
      // 发送通知
      new Notification({ title: `Monit - ${name}`, body: message }).show()
    }
  })

  // 打开网址
  ipcMain.on('open-url', function (event, url) {
    shell.openExternal(url)
  })

  // 保存值
  ipcMain.on('set-value', function (event, key, value) {
    const win = BrowserWindow.fromWebContents(event.sender) as BrowserWindow
    const name = win.title
    cset(name, key, JSON.parse(value))
  })

  // 读取值
  ipcMain.on('get-value', function (event, key, define) {
    const win = BrowserWindow.fromWebContents(event.sender) as BrowserWindow
    const name = win.title
    event.returnValue = cget(name, key, define)
  })
}

// 窗口事件
export const winEvent = (win: BrowserWindow, name: string) => {
  // 记录移动事件
  win.on('move', function () {
    const [x, y] = win.getPosition()
    cset(name, 'x', x)
    cset(name, 'y', y)
  })
}
