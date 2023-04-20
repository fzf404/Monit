/*
 * @Author: fzf404
 * @Date: 2023-04-20 13:31:08
 * @LastEditTime: 2023-04-20 13:34:48
 * @LastEditors: fzf404 me@fzf404.art
 * @Description: lock 初始化
 */

import { app, BrowserWindow } from 'electron'

// 初始化应用锁
export const initLock = () => {
  // 限制实例个数
  if (!app.requestSingleInstanceLock()) {
    app.quit()
  }

  // 窗口激活
  app.on('second-instance', () => {
    BrowserWindow.getAllWindows().forEach((win) => {
      win.focus()
    })
  })
}
