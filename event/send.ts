/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-02 23:08:36
 * @Description: send 事件发送
 */

import { ipcRenderer } from 'electron'

// 发送事件
export const sendEvent = (event: string, ...options: any) => {
  ipcRenderer.send(event, ...options)
}

// 调用事件
export const callEvent = (event: string, ...options: any): any => {
  return ipcRenderer.sendSync(event, ...options)
}

// 保存数据
export const setValue = (key: string, value: Object) => {
  sendEvent('set-value', key, JSON.stringify(value))
}

// 读取数据
export const getValue = (key: string, defalut: Object): Object => {
  return callEvent('get-value', key, JSON.stringify(defalut))
}

// 发送通知
export const sendNotice = (message: string) => {
  sendEvent('plugin-notice', message)
}

// 发送弹窗
export const sendAlert = (message: string) => {
  sendEvent('plugin-alert', message)
}

// 发送确认弹窗
export const sendConfirm = (message: string, callback: Function) => {
  sendEvent('plugin-confirm', message, callback)
}

// 打开网址
export const openURL = (url: string) => {
  sendEvent('open-url', url)
}

// 获取设备权限
export const getMediaPermission = (mediaType: 'microphone' | 'camera'): boolean => {
  return callEvent('get-media-permission', mediaType)
}

// 请求设备权限
export const requestMediaPermission = (mediaType: 'microphone' | 'camera'): boolean => {
  return callEvent('request-media-permission', mediaType)
}
