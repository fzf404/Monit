import type { PluginLocale, PluginTheme } from '~/context/interface'

export interface State {
  sticky: boolean
  theme: PluginTheme
  locale: PluginLocale
  navbar: {
    show: boolean
    sticky: boolean
    dragging: boolean
  }
  setting: {
    show?: boolean
    data?: Array<{
      name: string
      label: string
      remark: string
      value: unknown
    }>
  }
  loading: {
    show?: boolean
    remark?: string | string[]
  }
  qrcode: {
    url?: string
    show?: boolean
    remark?: string
  }
}
