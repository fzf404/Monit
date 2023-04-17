/*
 * @Author: fzf404
 * @Date: 2022-07-15 12:45:00
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-28 21:11:18
 * @Description: plugin 调用
 */

import { BrowserWindow } from 'electron'

import { getPluginConfig, pluginExist } from '~/config/plugin'
import { createWindow } from '~/core/window'
import { get, set, store } from '~/lib/storage'

// 获取窗口
export const getPlugin = (event: string | Electron.IpcMainEvent | Electron.IpcMainInvokeEvent): BrowserWindow => {
  if (typeof event === 'string') {
    // 通过标题获取窗口
    return BrowserWindow.getAllWindows().find((win) => win.title === event) as BrowserWindow
  } else {
    // 通过事件获取窗口
    return BrowserWindow.fromWebContents(event.sender) as BrowserWindow
  }
}

// 获取窗口标题
export const getPluginTitle = (event: Electron.IpcMainEvent | Electron.IpcMainInvokeEvent): string => {
  return getPlugin(event).getTitle()
}

// 获取窗口配置
export const getPluginSetting = (name: string) => {
  return store.get(name, {})
}

// 创建插件
export const createPlugin = (name: string | Array<string>) => {
  // 创建单个插件
  const createPluginByName = (name: string) => {
    // 判断插件存在
    if (!pluginExist(name)) return
    // 获取插件配置
    const plugin = getPluginConfig(name)
    // 获取窗口
    const actice = getPlugin(name)
    if (actice) {
      return focusPlugin(actice)
    }
    // 获取配置
    const setting = getPluginSetting(name) as any
    // 创建窗口
    const win = createWindow({ name, x: setting.x, y: setting.y, top: setting.top, size: plugin.size })
    // 监听窗口
    return recordPlugin(win)
  }
  // 创建插件
  if (typeof name === 'string') {
    createPluginByName(name)
  } else {
    for (const item of name) {
      createPluginByName(item)
    }
  }
}

// 自启窗口
export const bootPlugin = (name: string | Array<string>, state: boolean) => {
  // 获取自启列表
  const boot = new Set(get('config', 'boot', []) as Array<string>)
  // 更新自启状态
  if (state) {
    // 开机自启
    if (typeof name === 'string') {
      boot.add(name)
    } else {
      for (const item of name) {
        boot.add(item)
      }
    }
  } else {
    // 关闭自启
    if (typeof name === 'string') {
      boot.delete(name)
    } else {
      for (const item of name) {
        boot.delete(item)
      }
    }
  }
  // 保存自启状态
  set('config', 'boot', boot)
}

// 重置窗口
export const resetPlugin = (name: string) => {
  store.delete(name)
}

// 关闭窗口
export const closePlugin = (win: BrowserWindow) => {
  win.close()
}

// 重载窗口
export const reloadPlugin = (win: BrowserWindow) => {
  win.reload()
}

// 最小化窗口
export const miniPlugin = (win: BrowserWindow) => {
  win.minimize()
}

// 置顶窗口
export const stickyPlugin = (win: BrowserWindow, state: boolean) => {
  win.setAlwaysOnTop(state)
}

// 聚焦窗口
export const focusPlugin = (win: BrowserWindow) => {
  win.show()
}

// 记录窗口
export const recordPlugin = (win: BrowserWindow) => {
  // 记录移动事件
  win.on('move', () => {
    const [x, y] = win.getPosition()
    set(win.title, 'x', x)
    set(win.title, 'y', y)
  })
}
