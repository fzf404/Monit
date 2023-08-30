import { defineStore } from 'pinia'

import i18n from './i18n'

interface State {
  locale: 'en' | 'zh'
  theme: 'dark' | 'light'
  navbar: {
    show: boolean
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
      setting: {
        show: false,
        exist: false,
      },
      navbar: {
        show: true,
      },
    }
  },
  getters: {},
  actions: {
    toggleLocale() {
      this.locale = this.locale === 'en' ? 'zh' : 'en'
      i18n.global.locale.value = this.locale
    },
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      document.documentElement.dataset.theme = this.theme
    },
    toggleSetting() {
      this.setting.show = !this.setting.show
    },
  },
})

export { useState }
