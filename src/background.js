import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import { autoUpdater } from 'electron-updater'
import Store from 'electron-store'

// 调试模式
const isDevelopment = process.env.NODE_ENV !== 'production'

// 注册协议
protocol.registerSchemesAsPrivileged([{ scheme: 'monit', privileges: { secure: true, standard: true } }])

const store = new Store({
  // 版本更新初始化
  migrations: {
    '>=0.2.0': (store) => {
      store.clear()
    },
  },
})

// 读取配置
const x = store.get('x') === undefined ? 10 : store.get('x')
const y = store.get('y') === undefined ? 10 : store.get('y')
const top = store.get('top') === undefined ? false : store.get('top')

// 创建窗口
function createWindow() {
  const win = new BrowserWindow({
    x: x,
    y: y,
    width: 420,
    height: 200,
    alwaysOnTop: top, // 置顶
    transparent: true, // 透明
    hasShadow: false, // 阴影
    frame: false, // 隐藏边框
    fullscreenable: false, // 禁止全屏
    resizable: false, // 不可调整大小

    // opacity: 0.8, // 不透明度
    // vibrancy: 'dark', // mac 毛玻璃
    // visualEffectState: 'active', // mac 毛玻璃 自动应用

    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  })

  // 监听事件
  handleEvents(win)

  // 启动应用
  launchApp(win)
}

// 监听事件
function handleEvents(win) {
  // 监听移动事件
  win.on('move', function () {
    const [n_x, n_y] = win.getPosition()
    store.set('x', n_x) // 保存位置
    store.set('y', n_y)
  })
  // 窗口置顶
  ipcMain.on('window-top', function (event, n_top) {
    win.setAlwaysOnTop(n_top)
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

// 启动应用
async function launchApp(win) {
  // 调试模式下退出方法
  if (isDevelopment) {
    if (process.platform === 'win32') {
      process.on('message', (data) => {
        if (data === 'graceful-exit') {
          app.quit()
        }
      })
    } else {
      process.on('SIGTERM', () => {
        app.quit()
      })
    }
  }

  // 根据模式启动应用
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // 调试模式
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL) // 加载应用
    if (!process.env.IS_TEST) win.webContents.openDevTools() // 打开调试器
  } else {
    // 生产模式
    createProtocol('app') // 创建协议
    win.loadURL('app://./index.html') // 加载应用
  }
}

// 初始化窗口
function initWindow() {
  // mac 激活窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // mac 关闭窗口
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  // 自动更新
  app.on('ready', () => {
    autoUpdater.checkForUpdatesAndNotify()
  })

  // 准备就绪
  app.on('ready', async () => {
    // 调试模式下安装 vue-devtools
    if (isDevelopment && !process.env.IS_TEST) {
      try {
        await installExtension(VUEJS3_DEVTOOLS)
      } catch (e) {
        console.error('Vue Devtools failed to install:', e.toString())
      }
    }
    // 修复 Linux 无法透明窗口
    setTimeout(() => {
      createWindow()
    }, 300)
  })
}

// 初始化窗口
initWindow()
