import { ipcRenderer } from 'electron'

// 发送事件
export const sendEvent = (event, option) => {
  ipcRenderer.send(event, option)
}

// 发送通知
export const notification = (option) => {
  sendEvent('window-notice', option)
}