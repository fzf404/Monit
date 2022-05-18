import { app, ipcMain } from 'electron'
import { cset } from './storage'

export default function (win, name) {
  // 监听移动事件
  win.on('move', function () {
    const [x, y] = win.getPosition()
    cset(name, 'x', x)
    cset(name, 'y', y)
  })
  // 窗口置顶
  ipcMain.on('window-top', function (event, top) {
    win.setAlwaysOnTop(top)
    cset(name, 'top', top)
  })
  // 窗口最小化
  ipcMain.on('window-mini', function () {
    win.minimize()
  })
  // 关闭窗口
  ipcMain.on('window-close', function () {
    app.quit()
  })
}
