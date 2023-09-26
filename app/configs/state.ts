import { defineStore } from 'pinia'
import { reactive } from 'vue'

import type { PluginData } from '~/context/interface'

import type { State } from './interface'
import { setWatch } from './watch'

const control = (await window.api?.invoke(
  'get-plugin-data',
  'control',
)) as PluginData['control']
const locale =
  (await window.api?.invoke('get-locale')) ??
  (navigator.language.startsWith('zh') ? 'cn' : 'en')

export const useState = defineStore('state', () => {
  const state = reactive<State>({
    locale,
    sticky: control?.sticky ?? false,
    theme:
      control?.theme ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'),
    navbar: {
      show: true,
      dragging: false,
      sticky: control?.navbar ?? true,
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
    toggleLocale: () => {
      state.locale = state.locale === 'cn' ? 'en' : 'cn'
    },
    toggleTheme: () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    },
    toggleNavbar: () => {
      state.navbar.sticky = !state.navbar.sticky
    },
    setNavbarShow: (show: boolean) => {
      state.navbar.show = show
    },
    setNavbarDragging: (dragging: boolean) => {
      state.navbar.dragging = dragging
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
