/*
 * @Author: fzf404
 * @Date: 2022-10-03 16:54:16
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-10-27 22:47:56
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
  } catch (e) {
    console.error('Vue Devtools 安装失败：', e.toString())
  }
}

// 初始化窗口事件
export const initWinEvent = (win, name) => {
  // 监听移动事件
  win.on('move', function () {
    const [x, y] = win.getPosition()
    cset(name, 'x', x)
    cset(name, 'y', y)
  })
  // 监听窗口大小改变
  win.on('resize', function () {
    const [width, height] = win.getSize()
    cset(name, 'width', width)
    cset(name, 'height', height)
  })
}

// TODO 检查更新
export const ckeckUpdate = () => {
  if (!isDebug) {
    autoUpdater.checkForUpdatesAndNotify({
      title: 'Monit - update',
      body: '已下载新版本，将会在软件关闭后自动更新。',
    })
  }
}

// TODO 初始化快捷键
export const initShortcut = () => {}
