import { defineStore } from 'pinia'

import i18n from './i18n'

interface State {
  sticky: boolean
  theme: 'dark' | 'light'
  locale: 'en' | 'zh'
  navbar: {
    show: boolean
    sticky: boolean
    dragging: boolean
  }
  setting: {
    show: boolean
    exist: boolean
  }
}

const useState = defineStore('state', {
  state: (): State => {
    return {
      sticky: false,
      theme: 'dark',
      locale: i18n.global.locale.value as State['locale'],
      navbar: {
        show: true,
        sticky: false,
        dragging: false,
      },
      setting: {
        show: false,
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
      this.locale = this.locale === 'en' ? 'zh' : 'en'
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

export { useState }
