/*
 * @Author: fzf404
 * @Date: 2022-05-26 19:48:32
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-15 16:59:34
 * @Description: window 初始化
 */
import { BrowserWindow } from 'electron'

import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

import { getPluginConfig, pluginExist } from '~/config/plugin'
import { get } from '~/lib/storage'
import { focusWin, getWin, getWinConf, recordWin } from '~/server/window'

// 窗口网格大小
const BasicMesh = 100

// 创建窗口
export const createWindow = (name) => {
  // 判断插件存在
  if (!pluginExist(name)) {
    return
  }

  // 获取插件配置
  const plugin = getPluginConfig(name)

  // 获取窗口
  const actice = getWin(name)
  if (actice) {
    return focusWin(actice)
  }

  // 获取配置
  const config = getWinConf(name)

  // 创建窗口
  const win = new BrowserWindow({
    title: name, // 窗口名
    x: config.x, // 窗口位置
    y: config.y, // 窗口位置
    width: plugin.size[0] * BasicMesh, // 窗口大小
    height: plugin.size[1] * BasicMesh,
    alwaysOnTop: config.top, // 窗口置顶

    frame: false, // 隐藏边框
    resizable: false, // 固定长宽
    hasShadow: false, // 隐藏阴影
    transparent: true, // 窗口透明
    skipTaskbar: true, // 隐藏任务栏图标
    fullscreenable: false, // 禁止全屏
    roundedCorners: false, // 阻止圆角

    // vibrancy: 'dark', // 毛玻璃效果
    visualEffectState: 'active', // 保持窗口激活

    webPreferences: {
      nodeIntegration: true, // 开启 Node 集成
      contextIsolation: false, // 关闭上下文隔离
      webSecurity: false // 关闭跨域安全限制
    }
  })

  // 根据模式启动应用
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // 调试模式
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '#/' + name)
  } else {
    // 生产模式
    createProtocol('monit') // 创建协议
    win.loadURL('monit://./index.html#/' + name) // 加载应用
  }

  // 监听窗口
  recordWin(win)
}

// 开机自启窗口
export const initBootWindow = () => {
  const plugins = get('config', 'open', [])
  // 判断首次启动
  if (plugins.length) {
    // 启动窗口
    plugins.forEach((item) => {
      createWindow(item)
    })
  } else {
    // 默认窗口
    createWindow('welcome')
  }
}
