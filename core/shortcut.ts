/*
 * @Author: fzf404
 * @Date: 2023-03-11 22:15:41
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-28 10:49:38
 * @Description: shortcut 初始化
 */

import { globalShortcut } from 'electron'

import { createPlugin } from '~/server/plugin'

// 初始化快捷键
export const initShortcut = () => {
  // 注册快捷键
  globalShortcut.register('CommandOrControl+,', () => {
    // 打开配置插件
    createPlugin('config')
  })
}
