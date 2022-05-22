import { app, ipcMain, Notification } from 'electron'
import { cget, cset } from '../common/storage'

export default function (win, name) {
  // 监听移动事件
  win.on('move', function () {
    const [x, y] = win.getPosition()
    cset(name, 'x', x)
    cset(name, 'y', y)
  })

  // 窗口置顶
  ipcMain.on('window-top', function () {
    // 获取置顶值
    const top = !cget(name, 'top', false)
    // 设置置顶值
    win.setAlwaysOnTop(top)
    // 保存置顶值
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

  // 发送通知
  ipcMain.on('notice', function (event, option) {
    new Notification(option).show()
  })
  // 开机自启
  ipcMain.on('auto-start', function (event, option) {
    app.setLoginItemSettings({ openAtLogin: option })
    cset(name, 'auto-start', option)
  })
}
