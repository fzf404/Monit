import { defineStore } from 'pinia'
import { reactive } from 'vue'

import type { State } from './interface'
import i18n from './locale'
import { setWatch } from './watch'

export const useState = defineStore('state', () => {
  const state = reactive<State>({
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
    setting: {},
    loading: {},
    qrcode: {},
  })

  setWatch(state)

  const action = {
    startDrag: () => {
      state.navbar.dragging = true
    },
    stopDrag: () => {
      state.navbar.dragging = false
    },
    toggleSticky: () => {
      state.sticky = !state.sticky
    },
    toggleNavbar: () => {
      state.navbar.sticky = !state.navbar.sticky
    },
    toggleLocale: () => {
      state.locale = state.locale === 'cn' ? 'en' : 'cn'
    },
    toggleTheme: () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    },
    toggleSetting: () => {
      state.setting.show = !state.setting.show
    },
    setNavbarShow: (value: boolean) => {
      state.navbar.show = value
    },
  }

  return {
    state,
    action,
  }
})
