/*
 * @Author: fzf404
 * @Date: 2022-07-15 12:45:00
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-15 16:59:00
 * @Description: app 操作
 */

import { app, dialog, shell, systemPreferences } from 'electron'

import { clear, get, set } from '~/lib/storage'

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
  clear()
  resetApp()
}

// 自启应用
export const bootApp = (state: boolean) => {
  app.setLoginItemSettings({
    openAtLogin: state
  })
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
  return systemPreferences.getMediaAccessStatus(type)
}

// 请求权限
export const requestMediaAccess = (type: 'microphone' | 'camera') => {
  return systemPreferences.askForMediaAccess(type)
}

// 打开链接
export const openURL = (url: string) => {
  shell.openExternal(url)
}

// 打开文件
export const openFile = (type: 'image' | 'video' | 'audio') => {
  const filters = [
    { name: 'image', extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'] },
    { name: 'video', extensions: ['mp4', 'avi', 'mov', 'mkv', 'flv', 'wmv'] },
    { name: 'audio', extensions: ['mp3', 'wav', 'flac', 'aac', 'ogg'] }
  ]
  return dialog.showOpenDialogSync({
    properties: ['openFile'],
    filters: [filters[type === 'image' ? 0 : type === 'video' ? 1 : 2]]
  })
}
