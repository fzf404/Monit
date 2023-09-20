import type { BrowserWindow } from 'electron'

export interface PluginConfig {
  name: string
  main: string
  emoji: string
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
    boot?: boolean
    sticky?: boolean
    navbar?: boolean
    theme?: PluginTheme
    locale?: PluginLocale
  }
  setting?: Record<string, unknown>[]
  data?: Record<string, unknown>[]
}
export interface PluginStorage extends PluginData {
  set: <K extends keyof PluginData>(
    key: K,
    value: PluginData[K],
  ) => Promise<void>
  clear: () => Promise<void>
}

export interface PluginOptions {
  name: string
  window: BrowserWindow
}
