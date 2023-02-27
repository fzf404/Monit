/*
 * @Author: fzf404
 * @Date: 2022-07-15 12:45:00
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-02-27 15:16:20
 * @Description: icp 事件发送
 */

import { app, BrowserWindow, dialog, ipcMain, Notification, shell, systemPreferences } from 'electron'

import { createWindow } from 'core/window'
import { get, set, store } from 'lib/storage'

// 退出应用
export const quitApp = () => {
  app.quit()
}

// 重启应用
export const restartApp = () => {
  app.relaunch()
  quitApp()
}

// 重置应用
export const resetApp = () => {
  store.clear()
  resetApp()
}

// 创建窗口
export const createWin = (name: string) => {
  createWindow(name)
}

// 重载窗口
export const reloadWin = (win: BrowserWindow) => {
  win.reload()
}

// 关闭窗口
export const closeWin = (win: BrowserWindow) => {
  win.close()
}

export const stickyWin = (win: BrowserWindow) => {
  win.setAlwaysOnTop(!win.isAlwaysOnTop())
}
// 获取窗口
export const getWindow = (event: Electron.IpcMainEvent): BrowserWindow => {
  return BrowserWindow.fromWebContents(event.sender) as BrowserWindow
}

// 获取窗口标题
export const getWindowTitle = (event: Electron.IpcMainEvent): string => {
  return getWindow(event).getTitle()
}

// 读取配置
export const readValue = (name: string, key: string, define: string) => {
  return get(name, key, JSON.parse(define))
}

// 保存配置
export const saveValue = (name: string, key: string, value: string) => {
  set(name, key, JSON.parse(value))
}

// 判断权限
export const judgeMediaAccess = (type: 'microphone' | 'camera') => {
  return systemPreferences.getMediaAccessStatus(type) === 'granted'
}

// 请求权限
export const requestMediaAccess = (type: 'microphone' | 'camera') => {
  systemPreferences.askForMediaAccess(type)
}

// 打开链接
export const openURL = (url: string) => {
  shell.openExternal(url)
}

// 发送通知
export const sendNotice = (name: string, message: string) => {
  new Notification({ title: `Monit - ${name}`, body: message }).show()
}

// 发送弹窗
export const sendAlert = (name: string, message: string) => {
  dialog.showMessageBox({
    type: 'warning',
    title: `Monit - ${name}`,
    message: message
  })
}
