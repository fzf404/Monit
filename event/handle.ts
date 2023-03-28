/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-28 15:36:06
 * @Description: handle 处理
 */

import { ipcMain } from 'electron'

import { bootApp, quitApp, resetApp, restartApp, getVersion } from '~/server/app'

import {
  closePlugin,
  createPlugin,
  getPlugin,
  getPluginTitle,
  miniPlugin,
  reloadPlugin,
  stickyPlugin
} from '~/server/plugin'

import {
  getValue,
  judgeMediaAccess,
  openFile,
  openURL,
  requestMediaAccess,
  sendAlert,
  sendNotice,
  setValue
} from '~/server/utils'

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

  ipcMain.on('app-version', (event) => {
    event.returnValue = getVersion()
  })

  // 开启窗口
  ipcMain.on('plugin-create', (_, name: string | Array<string>) => {
    createPlugin(name)
  })

  // 关闭窗口
  ipcMain.on('plugin-close', (event) => {
    closePlugin(getPlugin(event))
  })

  // 重启窗口
  ipcMain.on('plugin-reload', (event) => {
    reloadPlugin(getPlugin(event))
  })

  // 最小化窗口
  ipcMain.on('plugin-mini', (event) => {
    miniPlugin(getPlugin(event))
  })

  // 置顶窗口
  ipcMain.on('plugin-sticky', (event, state: boolean) => {
    stickyPlugin(getPlugin(event), state)
  })

  // 发送通知
  ipcMain.on('plugin-notice', (event, message: string) => {
    sendNotice(getPluginTitle(event), message)
  })

  // 发送弹窗
  ipcMain.on('plugin-alert', (event, message: string) => {
    sendAlert(getPluginTitle(event), message)
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
    setValue(getPluginTitle(event), key, value)
  })

  ipcMain.on('get-value', (event, key: string, defalut: string) => {
    event.returnValue = getValue(getPluginTitle(event), key, defalut)
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
