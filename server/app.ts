/*
 * @Author: fzf404
 * @Date: 2022-07-15 12:45:00
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-28 09:41:56
 * @Description: app 调用
 */

import { app } from 'electron'

import { clear } from '~/lib/storage'

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

// 获取版本
export const getVersion = () => {
  return app.getVersion()
}
