/*
 * @Author: fzf404
 * @Date: 2022-07-15 12:45:00
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-22 00:54:03
 * @Description: icp 事件发送
 */
import { ipcRenderer } from 'electron'

// 发送事件
export const sendEvent = (event: string, option: any) => {
  ipcRenderer.send(event, option)
}

// 发送通知
export const sendNotice = (option: any) => {
  sendEvent('window-notice', option)
}
