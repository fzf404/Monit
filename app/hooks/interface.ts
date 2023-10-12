import type { PluginLocale, PluginTheme } from '~/context/interface'

interface SettingMenuBase {
  label: Record<PluginLocale, string>
  help?: string
}

interface SettingMenuText extends SettingMenuBase {
  type: 'text'
  temp?: string
  value: string
  length?: number
}

interface SettingMenuNumber extends SettingMenuBase {
  type: 'number'
  temp?: number
  value: number
  length?: number
}

interface SettingMenuSwitch extends SettingMenuBase {
  type: 'switch'
  temp?: boolean
  value: boolean
}

interface SettingMenuSelect extends SettingMenuBase {
  type: 'select'
  temp?: string
  value: string
  options: Record<string, string>
}

interface SettingMenuButton extends SettingMenuBase {
  type: 'button'
  temp?: string
  value: string
  click: () => Promise<string>
}

export type SettingMenus = Record<
  string,
  | SettingMenuText
  | SettingMenuNumber
  | SettingMenuSwitch
  | SettingMenuSelect
  | SettingMenuButton
>

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
    menu: SettingMenus
    callback?: () => void
  }
}
