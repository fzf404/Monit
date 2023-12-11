/*
 * @Author: fzf404
 * @Date: 2022-05-26 19:48:32
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-17 21:19:31
 * @Description: window 初始化
 */

import { BrowserWindow } from 'electron'

import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

import { get } from '~/lib/storage'
import { createPlugin } from '~/server/plugin'

// 窗口配置
interface WindowOption {
  name: string
  x: number
  y: number
  top: boolean
  size: number[]
}

// 创建窗口
export const createWindow = (option: WindowOption): BrowserWindow => {
  // 创建窗口
  const win = new BrowserWindow({
    title: option.name, // 窗口名
    x: option.x, // 窗口位置
    y: option.y, // 窗口位置
    width: option.size[0], // 窗口大小
    height: option.size[1],
    alwaysOnTop: option.top, // 窗口置顶

    frame: false, // 展示边框
    resizable: true, // 可变大小
    hasShadow: false, // 展示阴影
    transparent: true, // 窗口透明
    skipTaskbar: true, // 隐藏任务栏图标
    fullscreenable: false, // 禁止全屏
    roundedCorners: false, // 阻止圆角

    // vibrancy: 'dark', // 毛玻璃效果
    visualEffectState: 'active', // 保持窗口激活

    webPreferences: {
      nodeIntegration: true, // 开启集成
      contextIsolation: false, // 关闭上下文隔离
      webSecurity: false // 关闭跨域安全限制
    }
  })

  // 根据模式启动应用
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // 调试模式
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '#/' + option.name)
  } else {
    // 生产模式
    createProtocol('monit') // 创建协议
    win.loadURL('monit://./index.html#/' + option.name) // 加载应用
  }

  return win
}

// 开机自启窗口
export const createBootWindow = () => {
  const plugins = get('config', 'boot', []) as Array<string>
  // 判断首次启动
  if (plugins.length) {
    // 启动窗口
    createPlugin(plugins)
  } else {
    // 默认窗口
    createPlugin('guide')
  }
}
