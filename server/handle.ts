/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-27 18:12:37
 * @Description: handle 处理
 */

import { ipcMain } from 'electron'

import { bootApp, judgeMediaAccess, openFile, openURL, quitApp, requestMediaAccess, resetApp, restartApp } from './app'

import { getValue, setValue } from './app'

import {
  closeWin,
  createWin,
  getWin,
  getWinTitle,
  miniWin,
  reloadWin,
  sendAlert,
  sendNotice,
  stickyWin
} from './window'

// 应用事件
export const initIPC = () => {
  // 退出应用
  ipcMain.on('app-quit', () => {
    quitApp()
  })

  // 重启应用
  ipcMain.on('app-restart', () => {
    restartApp()
  })

  // 重置应用
  ipcMain.on('app-reset', () => {
    resetApp()
  })

  // 开机自启
  ipcMain.on('app-boot', (_, state: boolean) => {
    bootApp(state)
  })

  // 开启窗口
  ipcMain.on('win-create', (_, name: string) => {
    createWin(name)
  })

  // 关闭窗口
  ipcMain.on('win-close', (event) => {
    closeWin(getWin(event))
  })

  // 重启窗口
  ipcMain.on('win-reload', (event) => {
    reloadWin(getWin(event))
  })

  // 最小化窗口
  ipcMain.on('win-mini', (event) => {
    miniWin(getWin(event))
  })

  // 置顶窗口
  ipcMain.on('win-sticky', (event, state: boolean) => {
    stickyWin(getWin(event), state)
  })

  // 发送通知
  ipcMain.on('win-notice', (event, message: string) => {
    sendNotice(getWinTitle(event), message)
  })

  // 发送弹窗
  ipcMain.on('win-alert', (event, message: string) => {
    sendAlert(getWinTitle(event), message)
  })

  // 打开网址
  ipcMain.on('open-url', (_, url: string) => {
    openURL(url)
  })

  // 打开图像
  ipcMain.on('open-image', (event) => {
    event.returnValue = openFile('image')
  })

  // 保存值
  ipcMain.on('set-value', (event, key: string, value: string) => {
    setValue(getWinTitle(event), key, value)
  })

  ipcMain.on('get-value', (event, key: string, defalut: string) => {
    event.returnValue = getValue(getWinTitle(event), key, defalut)
  })

  // 获取设备权限
  ipcMain.on('get-media-permission', (event, mediaType: 'microphone' | 'camera') => {
    event.returnValue = judgeMediaAccess(mediaType) === 'granted'
  })

  // 请求设备权限
  ipcMain.on('request-media-permission', (event, mediaType: 'microphone' | 'camera') => {
    console.log('requestMediaAccess(mediaType)', requestMediaAccess(mediaType))
    event.returnValue = requestMediaAccess(mediaType)
  })
}
