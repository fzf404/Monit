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
    setNavbarShow: (show: boolean) => {
      state.navbar.show = show
    },
    toggleSetting: () => {
      state.setting.show = !state.setting.show
    },
    setSettingShow: (show: boolean) => {
      state.setting.show = show
    },
    setSettingData: (data: State['setting']['data']) => {
      state.setting.data = data
    },
    setLoadingShow: (show: boolean) => {
      state.loading.show = show
    },
    setLoadingRemark: (remark: string | string[]) => {
      state.loading.remark = remark
    },
    setQRCodeURL: (url: string) => {
      state.qrcode.url = url
    },
    setQRCodeShow: (show: boolean) => {
      state.qrcode.show = show
    },
    setQRCodeRemark: (remark: string) => {
      state.qrcode.remark = remark
    },
  }

  return {
    state,
    action,
  }
})
