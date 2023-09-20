import type { BrowserWindow } from 'electron'

export interface PluginConfig {
  name: string
  width: number
  height: number
  description: {
    en: string
    cn: string
  }
  multiple?: boolean
}

export type PluginLocale = 'en' | 'cn'
export type PluginTheme = 'light' | 'dark'

export interface PluginData {
  config?: {
    x?: number
    y?: number
    sticky?: boolean
    theme?: PluginTheme
    navbar?: boolean
    locale?: PluginLocale
  }
  setting?: Record<string, unknown>[]
  data?: Record<string, unknown>[]
}
export interface PluginStorage {
  get: <K extends keyof PluginData>(key: K) => PluginData[K]
  set: <K extends keyof PluginData>(
    key: K,
    value: PluginData[K],
  ) => Promise<void>
  clear: () => Promise<void>
}

export interface PluginOptions {
  name: string
  plugin: PluginConfig
  window: BrowserWindow
  storage: PluginStorage
}
