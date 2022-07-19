/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-06-19 00:54:30
 * @Description: 事件处理
 */

import { BrowserWindow, ipcMain, Notification } from 'electron'

import { cget, cset } from '../lib/storage'

// 应用事件
export const appEvent = () => {
  // 窗口关闭
  ipcMain.on('window-close', function (event) {
    // 从事件中获得窗口
    const win = BrowserWindow.fromWebContents(event.sender)
    // 关闭窗口
    win.close()
  })

  // 窗口最小化
  ipcMain.on('window-mini', function (event) {
    const win = BrowserWindow.fromWebContents(event.sender)
    win.minimize()
  })

  // 窗口置顶
  ipcMain.on('window-top', function (event, option) {
    const win = BrowserWindow.fromWebContents(event.sender)
    // 获取窗口名
    const name = win.title
    // 设置置顶
    win.setAlwaysOnTop(option)
    // 保存置顶状态
    cset(name, 'top', option)
  })

  // 发送通知
  ipcMain.on('window-notice', function (event, option) {
    const win = BrowserWindow.fromWebContents(event.sender)
    const name = win.title
    const notice = cget(name, 'notice', false)
    if (notice) {
      new Notification({ title: `Monit: ${name}`, body: option }).show()
    }
  })
}

// 窗口事件
export const winEvent = (win, name) => {
  // 记录移动事件
  win.on('move', function () {
    const [x, y] = win.getPosition()
    cset(name, 'x', x)
    cset(name, 'y', y)
  })
}
