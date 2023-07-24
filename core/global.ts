import { BrowserWindow, nativeImage, Tray } from 'electron'

let TrayMenu: Tray

export const getTray = (image: string) => {
  TrayMenu = new Tray(nativeImage.createFromPath(image))
  return TrayMenu
}

const WindowsMap: Map<string, BrowserWindow> = new Map()

export const setWindows = (key: string, value: BrowserWindow) => {
  WindowsMap.set(key, value)
}

export const getWindows = (key: string) => {
  return WindowsMap.get(key)
}
