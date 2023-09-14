import { defineStore } from 'pinia'

import type { PluginLocale, PluginTheme } from '~/context/interface'

import i18n from './locale'

export interface SettingState {
  show?: boolean
  data?: Record<string, unknown>
}

export interface LoadingState {
  show?: boolean
  remark?: string | string[]
}

export interface QRCodeState {
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
      theme: 'light',
      // theme: window.matchMedia('(prefers-color-scheme: dark)').matches
      //   ? 'dark'
      //   : 'light',
      locale: i18n.global.locale.value as State['locale'],
      navbar: {
        show: true,
        sticky: true,
        dragging: false,
      },
      setting: {},
      loading: {},
      qrcode: {},
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
