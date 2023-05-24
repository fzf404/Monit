/*
 * @Author: fzf404
 * @Date: 2022-05-26 19:48:32
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-17 21:19:31
 * @Description: window 初始化
 */

import { BrowserWindow } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { join } from 'path'

import { get } from '~/lib/storage'
import { createPlugin } from '~/server/plugin'

import { protocol } from 'electron'
import * as path from 'path'
import { readFile } from 'fs'
import { URL } from 'url'

const createProtocol = (scheme: string) => {
  protocol.registerBufferProtocol(scheme, (request, respond) => {
    let pathName = new URL(request.url).pathname
    pathName = decodeURI(pathName) // Needed in case URL contains spaces

    readFile(path.join(__dirname, pathName), (error, data) => {
      if (error) {
        console.error(`Failed to read ${pathName} on ${scheme} protocol`, error)
      }
      const extension = path.extname(pathName).toLowerCase()
      let mimeType = ''

      if (extension === '.js') {
        mimeType = 'text/javascript'
      } else if (extension === '.html') {
        mimeType = 'text/html'
      } else if (extension === '.css') {
        mimeType = 'text/css'
      } else if (extension === '.svg' || extension === '.svgz') {
        mimeType = 'image/svg+xml'
      } else if (extension === '.json') {
        mimeType = 'application/json'
      } else if (extension === '.wasm') {
        mimeType = 'application/wasm'
      }

      respond({ mimeType, data })
    })
  })
}

// 窗口网格大小
const BasicMesh = 300

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
    width: option.size[0] * BasicMesh, // 窗口大小
    height: option.size[1] * BasicMesh,
    alwaysOnTop: option.top, // 窗口置顶

    frame: false, // 展示边框
    resizable: false, // 可变大小
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

  // // 根据模式启动应用
  // if (process.env.WEBPACK_DEV_SERVER_URL) {
  //   // 调试模式
  //   win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '#/' + option.name)
  // } else {
  //   // 生产模式
  //   createProtocol('monit') // 创建协议
  //   win.loadURL('monit://./index.html#/' + option.name) // 加载应用
  // }

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(join(__dirname, '../app/index.html'))
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
