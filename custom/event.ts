/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-10-04 09:08:01
 * @Description: event 处理
 */

import { app, BrowserWindow, dialog, ipcMain, Notification, shell } from 'electron'

import { createWindow } from 'core/window'
import { cget, cset, store } from '~/storage'

// 应用事件
export const initIPC = () => {
  // 退出应用
  ipcMain.on('app-quit', function (event) {
    app.quit()
  })

  // 重启应用
  ipcMain.on('app-reload', function (event) {
    app.relaunch()
    app.quit()
  })

  // 重置应用
  ipcMain.on('app-reset', function (event) {
    store.clear()
    app.relaunch()
    app.quit()
  })

  // 开机自启
  ipcMain.on('app-auto', function (event, state: boolean) {
    app.setLoginItemSettings({
      openAtLogin: state,
    })
  })

  // 开启窗口
  ipcMain.on('win-open', function (event, name: string) {
    createWindow(name)
  })

  // 关闭窗口
  ipcMain.on('win-close', function (event) {
    // 从事件中获得窗口
    const win = BrowserWindow.fromWebContents(event.sender) as BrowserWindow
    // 关闭窗口
    win.close()
  })

  // 最小化窗口
  ipcMain.on('win-mini', function (event) {
    const win = BrowserWindow.fromWebContents(event.sender) as BrowserWindow
    win.minimize()
  })

  // 置顶窗口
  ipcMain.on('win-top', function (event, state: boolean) {
    const win = BrowserWindow.fromWebContents(event.sender) as BrowserWindow
    // 设置置顶
    win.setAlwaysOnTop(state)
  })

  // 发送通知
  ipcMain.on('win-notice', function (event, message: string) {
    const win = BrowserWindow.fromWebContents(event.sender) as BrowserWindow
    const name = win.title
    // 发送通知
    new Notification({ title: `Monit - ${name}`, body: message }).show()
  })

  // 发送弹窗
  ipcMain.on('win-alert', function (event, message: string) {
    const win = BrowserWindow.fromWebContents(event.sender) as BrowserWindow
    const name = win.title
    dialog.showMessageBox({
      type: 'warning',
      title: 'Monit - ' + name,
      message: message,
    })
  })

  // 打开本地图像
  ipcMain.on('open-image', function (event) {
    event.returnValue = dialog.showOpenDialogSync({
      properties: ['openFile'],
      filters: [{ name: '图像', extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'] }],
    })
  })

  // 打开网址
  ipcMain.on('open-url', function (event, url: string) {
    shell.openExternal(url)
  })

  // 保存值
  ipcMain.on('set-value', function (event, key: string, value: string) {
    const win = BrowserWindow.fromWebContents(event.sender) as BrowserWindow
    const name = win.title
    cset(name, key, JSON.parse(value))
  })

  // 读取值
  ipcMain.on('get-value', function (event, key: string, define: string) {
    const win = BrowserWindow.fromWebContents(event.sender) as BrowserWindow
    const name = win.title
    event.returnValue = cget(name, key, JSON.parse(define))
  })
}
