/*
 * @Author: fzf404
 * @Date: 2022-10-03 16:54:16
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2022-11-10 13:36:12
 * @Description: utils 工具
 */
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { cset } from '~/storage'

// 调试模式
const isDebug = process.env.NODE_ENV === 'development'

// 初始化调试工具
export const initDevtools = () => {
  try {
    installExtension(VUEJS_DEVTOOLS)
  } catch (err) {
    console.error('Vue Devtools 安装失败：', err.message)
  }
}

// 初始化窗口事件
export const initWinEvent = (win, name) => {
  // 记录移动事件
  win.on('move', function () {
    const [x, y] = win.getPosition()
    cset(name, 'x', x)
    cset(name, 'y', y)
  })
}

// TODO 检查更新
export const ckeckUpdate = () => {}

// TODO 初始化快捷键
export const initShortcut = () => {}
