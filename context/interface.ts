type PluginTheme = 'light' | 'dark'
type PluginLocale = 'en' | 'zh'
interface PluginData {
  config: {
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

interface PluginConfig {
  name: string
  width: number
  height: number
  description: {
    en: string
    cn: string
  }
}

export type { PluginTheme, PluginLocale, PluginData, PluginConfig }
