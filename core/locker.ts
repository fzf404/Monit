/*
 * @Author: fzf404
 * @Date: 2023-04-20 13:31:08
 * @LastEditTime: 2023-04-20 21:54:51
 * @LastEditors: fzf404 me@fzf404.art
 * @Description: locker 初始化
 */

import { app } from 'electron'

import { focusAllPlugin } from '~/server/plugin'

// 初始化应用锁
export const initLock = () => {
  // 限制实例个数
  if (!app.requestSingleInstanceLock()) {
    app.quit()
  }

  // 激活全部插件
  app.on('second-instance', () => {
    focusAllPlugin()
  })
}
