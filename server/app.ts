/*
 * @Author: fzf404
 * @Date: 2022-07-15 12:45:00
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-30 21:20:25
 * @Description: app 调用
 */

import { app } from 'electron'

import { get, set, clear } from '~/lib/storage'

// 读取配置
export const getValue = (name: string, key: string, defalut: string) => {
  return get(name, key, JSON.parse(defalut))
}

// 保存配置
export const setValue = (name: string, key: string, value: string) => {
  set(name, key, JSON.parse(value))
}

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
