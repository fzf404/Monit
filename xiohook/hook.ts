import { BrowserWindow, screen } from 'electron'

const { fork } = require('child_process')

class MouseHook {
  private child: any
  private wins: { [key: string]: BrowserWindow } = {}

  private send = (name: string, data: any = null) => {
    if (this.child) {
      this.child.send({ name: name, data: data })
    }
  }

  private emit = (name: string, event: string, data: any = null) => {
    if (this.wins[name]) {
      this.wins[name].webContents.send(event, data)
    }
  }

  registerWindow(win: BrowserWindow) {
    console.log('registerWindow')
    const name = win.getTitle()
    this.wins[name] = win
    const [x, y] = win.getPosition()
    const [width, height] = win.getSize()
    this.send('win:create', { name, x, y, width, height })
    win.on('move', () => {
      const [x, y] = win.getPosition()
      this.send('win:move', { name, x, y })
    })
    win.on('resize', () => {
      const [width, height] = win.getSize()
      this.send('win:resize', { name, width, height })
    })
    win.on('close', () => {
      delete this.wins[name]
      this.send('win:close', { name })
    })
    return this
  }

  start() {
    this.child = fork('./xiohook/mouse.js')
    this.child.on('message', (event: any) => {
      const name = event.name
      const data = event.data
      switch (name) {
        case 'msr:get-point':
          const point = screen.getCursorScreenPoint()
          this.send('ms:point', { x: point.x, y: point.y })
          break
        case 'msr:mouseenter':
          this.emit(data, 'mouseenter', null)
          break
        case 'msr:mouseleave':
          this.emit(data, 'mouseleave', null)
          break
      }
    })
  }

  stop() {
    this.send('ms:stop')
  }
}

let mouseHook: MouseHook

export const registerWindow = (win: BrowserWindow) => {
  if (mouseHook != null) {
    mouseHook.registerWindow(win)
  }
}

export const hook = () => {
  mouseHook = new MouseHook()
  mouseHook.start()
}

export const unhook = () => {
  if (mouseHook != null) {
    mouseHook.stop()
  }
}
