/// <reference types="electron-vite/node" />
import type { IpcRenderer } from '@electron-toolkit/preload'

declare global {
  interface Window {
    api: IpcRenderer
  }
}
