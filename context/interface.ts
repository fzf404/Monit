export interface PluginConfig {
  name: string
  width: number
  height: number
  description: {
    en: string
    cn: string
  }
}

export type PluginLocale = 'en' | 'cn'
export type PluginTheme = 'light' | 'dark'

export interface PluginData {
  config?: {
    x?: number
    y?: number
    width?: number
    height?: number
    sticky?: boolean
    navbar?: boolean
    resizable?: boolean
    theme?: PluginTheme
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
  remove: (key: keyof PluginData) => Promise<void>
  clear: () => Promise<void>
}
