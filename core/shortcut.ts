/*
 * @Author: fzf404
 * @Date: 2023-03-11 22:15:41
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-30 09:18:36
 * @Description: shortcut 初始化
 */

import { globalShortcut } from 'electron'

import { createPlugin } from '~/server/plugin'

// 初始化快捷键
export const initShortcut = () => {
  // 注册全局快捷键
  globalShortcut.register('CommandOrControl+Shift+m', () => {
    // 打开配置插件
    createPlugin('config')
  })
}
