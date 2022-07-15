/*
 * @Author: fzf404
 * @Date: 2022-07-15 12:45:00
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-15 14:51:15
 * @Description: 事件发送
 */
import { ipcRenderer } from 'electron'

// 发送事件
export const sendEvent = (event, option) => {
  ipcRenderer.send(event, option)
}

// 发送通知
export const notification = (option) => {
  sendEvent('window-notice', option)
}
