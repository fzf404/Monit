/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-22 20:42:18
 * @Description: event 处理
 */

import { app, BrowserWindow, dialog, ipcMain, Notification, shell } from 'electron'

import { createWindow } from 'core/window'
import { cget, cset } from '~/storage'

// 应用事件
export const appEvent = () => {
  // 开机自启
  ipcMain.on('auto-open', function (event, state) {
    app.setLoginItemSettings({
      openAtLogin: state,
    })
  })

  // 开启窗口
  ipcMain.on('window-open', function (event, name) {
    createWindow(name)
  })

  // 关闭窗口
  ipcMain.on('window-close', function (event, name) {
    if (name) {
      // 根据窗口名关闭窗口
      BrowserWindow.getAllWindows().forEach((win) => {
        if (win.title === name) {
          win.close()
        }
      })
    } else {
      // 从事件中获得窗口
      const win = BrowserWindow.fromWebContents(event.sender) as BrowserWindow
      // 关闭窗口
      win.close()
    }
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

  // 打开本地图像
  ipcMain.on('open-image', function (event) {
    event.returnValue = dialog.showOpenDialogSync({
      properties: ['openFile'],
      filters: [{ name: '图像', extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'] }],
    })
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
    event.returnValue = cget(name, key, JSON.parse(define))
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
