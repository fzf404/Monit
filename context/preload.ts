import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge } from 'electron'

const api = {
  ...electronAPI.ipcRenderer,
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.api = api
}
