import { BrowserWindow, nativeImage, Tray } from 'electron'

const MeshSize = 100

let TrayMenu: Tray
const getTray = (image: string) => {
  TrayMenu = new Tray(nativeImage.createFromPath(image))
  return TrayMenu
}

const WindowsMap: Map<string, BrowserWindow> = new Map()
const setWindows = (key: string, value: BrowserWindow) => {
  WindowsMap.set(key, value)
}
const getWindows = (key: string) => {
  return WindowsMap.get(key)
}

export { MeshSize, getTray, setWindows, getWindows }
