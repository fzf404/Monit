import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('api', electronAPI.ipcRenderer)
