import type { Locale, Theme } from './constant'

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
