import { defineStore } from 'pinia'

import i18n from './i18n'

interface State {
  locale: 'en' | 'zh'
  theme: 'dark' | 'light'
  navbar: {
    show: boolean
    sticky: boolean
  }
  setting: {
    show: boolean
    exist: boolean
  }
}

const useState = defineStore('state', {
  state: (): State => {
    return {
      theme: 'dark',
      locale: i18n.global.locale.value as State['locale'],
      navbar: {
        show: true,
        sticky: false,
      },
      setting: {
        show: false,
        exist: false,
      },
    }
  },
  getters: {},
  actions: {
    toggleNavbar() {
      this.navbar.sticky = !this.navbar.sticky
    },
    toggleLocale() {
      this.locale = this.locale === 'en' ? 'zh' : 'en'
      i18n.global.locale.value = this.locale
    },
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      document.documentElement.dataset.theme = this.theme
      window.api.invoke('plugin-theme', this.theme)
    },
    toggleSetting() {
      this.setting.show = !this.setting.show
    },
  },
})

export { useState }
