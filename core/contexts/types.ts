export type Locale = 'en' | 'cn'
export type Theme = 'sun' | 'moon'

export type LocaleMessage = Record<Locale, string>

export type PluginUserData = Record<string, unknown>

export type PluginSettingData = Record<string, number | string | boolean>

export type PluginControlData = {
  x?: number
  y?: number
  top?: boolean
  boot?: boolean
  lock?: boolean
  theme?: Theme
  locale?: Locale
}

export type PluginStorageFile = {
  data?: PluginUserData
  setting?: PluginSettingData
  control?: PluginControlData
}

export type PluginConfigFile = {
  name: string
  main: string
  width: number
  height: number
  emoji: string
  description: Record<Locale, string>
}
