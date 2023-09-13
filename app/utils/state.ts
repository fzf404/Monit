import { defineStore } from 'pinia'

import { PluginLocale, PluginTheme } from '~/context/interface'

import i18n from './i18n'

export interface SettingState {
  exist: boolean
  show?: boolean
  data?: Record<string, unknown>
}

export interface LoadingState {
  exist: boolean
  show?: boolean
  remark?: string | string[]
}

export interface QRCodeState {
  exist: boolean
  url?: string
  show?: boolean
  remark?: string
}

export interface State {
  theme: PluginTheme
  locale: PluginLocale
  sticky: boolean
  navbar: {
    show: boolean
    sticky: boolean
    dragging: boolean
  }
  setting: SettingState
  loading: LoadingState
  qrcode: QRCodeState
}

export const useState = defineStore('state', {
  state: (): State => {
    return {
      sticky: true,
      theme: window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
      locale: i18n.global.locale.value as State['locale'],
      navbar: {
        show: true,
        sticky: true,
        dragging: false,
      },
      setting: {
        exist: false,
      },
      loading: {
        exist: false,
      },
      qrcode: {
        exist: false,
      },
    }
  },
  getters: {},
  actions: {
    startDrag() {
      this.navbar.dragging = true
    },
    stopDrag() {
      this.navbar.dragging = false
    },
    toggleSticky() {
      this.sticky = !this.sticky
    },
    toggleNavbar() {
      this.navbar.sticky = !this.navbar.sticky
    },
    toggleLocale() {
      this.locale = this.locale === 'zh' ? 'en' : 'zh'
    },
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
    },
    toggleSetting() {
      this.setting.show = !this.setting.show
    },
    setNavbarShow(value: boolean) {
      this.navbar.show = value
    },
  },
})
