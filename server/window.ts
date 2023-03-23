/*
 * @Author: fzf404
 * @Date: 2022-07-15 12:45:00
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-16 12:35:41
 * @Description: window 操作
 */

import { BrowserWindow, dialog, Notification } from 'electron'

import { createWindow } from '~/core/window'
import { get, set, store } from '~/lib/storage'

// 获取窗口
export const getWin = (event: string | Electron.IpcMainEvent | Electron.IpcMainInvokeEvent): BrowserWindow => {
  if (typeof event === 'string') {
    // 通过标题获取窗口
    return BrowserWindow.getAllWindows().find((win) => win.title === event) as BrowserWindow
  } else {
    // 通过事件获取窗口
    return BrowserWindow.fromWebContents(event.sender) as BrowserWindow
  }
}

// 获取窗口标题
export const getWinTitle = (event: Electron.IpcMainEvent | Electron.IpcMainInvokeEvent): string => {
  return getWin(event).getTitle()
}

// 获取窗口配置
export const getWinConf = (name: string) => {
  return store.get(name, {})
}

// 创建窗口
export const createWin = (name: string | Array<string>) => {
  if (typeof name === 'string') {
    return createWindow(name)
  } else {
    return name.forEach((item) => createWindow(item))
  }
}

// 自启窗口
export const bootWin = (name: string | Array<string>, state: boolean) => {
  // 获取自启列表
  let boot = get('config', 'boot', []) as Array<string>
  // 判断自启状态
  if (state) {
    // 开机自启
    if (typeof name === 'string') {
      boot = [...new Set([...boot, name])]
    } else {
      boot = [...new Set([...boot, ...name])]
    }
  } else {
    // 关闭自启
    if (typeof name === 'string') {
      boot = boot.filter((item) => item !== name)
    } else {
    }
  }
  // 保存自启状态
  set('config', 'boot', boot)
}

// 重置窗口
export const resetWin = (name: string) => {
  store.delete(name)
}

// 关闭窗口
export const closeWin = (win: BrowserWindow) => {
  win.close()
}

// 重载窗口
export const reloadWin = (win: BrowserWindow) => {
  win.reload()
}

// 最小化窗口
export const miniWin = (win: BrowserWindow) => {
  win.minimize()
}

// 置顶窗口
export const stickyWin = (win: BrowserWindow, state: boolean) => {
  win.setAlwaysOnTop(state)
}

// 聚焦窗口
export const focusWin = (win: BrowserWindow) => {
  win.show()
}

// 记录窗口
export const recordWin = (win: BrowserWindow) => {
  // 记录移动事件
  win.on('move', () => {
    const [x, y] = win.getPosition()
    set(win.title, 'x', x)
    set(win.title, 'y', y)
  })
}

// 发送通知
export const sendNotice = (name: string, message: string) => {
  new Notification({ title: `Monit - ${name}`, body: message }).show()
}

// 发送弹窗
export const sendAlert = (name: string, message: string) => {
  dialog.showMessageBox({
    type: 'warning',
    title: `Monit - ${name}`,
    message: message
  })
}
