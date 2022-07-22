/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-22 00:53:56
 * @Description: event 处理
 */

import { BrowserWindow, ipcMain, Notification } from 'electron'

import { cget, cset } from '~/storage'

// 应用事件
export const appEvent = () => {
  // 窗口关闭
  ipcMain.on('window-close', function (event) {
    // 从事件中获得窗口
    const win = BrowserWindow.fromWebContents(event.sender) as BrowserWindow
    // 关闭窗口
    win.close()
  })

  // 窗口最小化
  ipcMain.on('window-mini', function (event) {
    const win = BrowserWindow.fromWebContents(event.sender) as BrowserWindow
    win.minimize()
  })

  // 窗口置顶
  ipcMain.on('window-top', function (event, option) {
    const win = BrowserWindow.fromWebContents(event.sender) as BrowserWindow
    // 设置置顶
    win.setAlwaysOnTop(option)
  })

  // 发送通知
  ipcMain.on('window-notice', function (event, option) {
    const win = BrowserWindow.fromWebContents(event.sender) as BrowserWindow
    const name = win.title
    // 通知开启状态
    const notice = cget(name, 'notice', false)
    if (notice) {
      new Notification({ title: `Monit: ${name}`, body: option }).show()
    }
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
