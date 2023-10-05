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
  loading: {
    show?: boolean
    remark?: string | string[]
  }
  qrcode: {
    url?: string
    show?: boolean
    remark?: string
  }
  setting: {
    show?: boolean
    menu?: Record<
      string,
      {
        value: unknown
        label: Record<PluginLocale, string>
        type: 'text' | 'number' | 'select' | 'checkbox'
        help?: string
        length?: number
        options?: Record<string, unknown>
      }
    >
  }
}
