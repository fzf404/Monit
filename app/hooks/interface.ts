import type { PluginLocale, PluginTheme } from '~/context/interface'

interface SettingMenuBase {
  label: Record<PluginLocale, string>
  help?: string
}

interface SettingMenuText extends SettingMenuBase {
  type: 'text'
  cache?: string
  value: string
  length?: number
}

interface SettingMenuNumber extends SettingMenuBase {
  type: 'number'
  cache?: number
  value: number
  length?: number
}

interface SettingMenuwitch extends SettingMenuBase {
  type: 'switch'
  cache?: boolean
  value: boolean
}

interface SettingMenuelect extends SettingMenuBase {
  type: 'select'
  cache?: string
  value: string
  options: Record<string, string>
}

interface SettingMenuButton extends SettingMenuBase {
  type: 'button'
  cache?: string
  value: string
  click: () => Promise<string>
}

export type SettingMenuItem =
  | SettingMenuText
  | SettingMenuNumber
  | SettingMenuwitch
  | SettingMenuelect
  | SettingMenuButton

export type SettingMenu = Record<string, SettingMenuItem>

export type SettingData = Record<string, SettingMenuItem['value']>

export interface State {
  sticky: boolean
  theme: PluginTheme
  locale: PluginLocale
  navbar: {
    show: boolean
    sticky: boolean
    dragging: boolean
  }
  loading?: {
    show: boolean
    remark?: string | string[]
  }
  qrcode?: {
    url: string
    show: boolean
    remark?: string
  }
  setting?: {
    show: boolean
    menu: SettingMenu
    callback?: (data: SettingData) => void
  }
}
