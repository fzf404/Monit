import { createI18n } from 'vue-i18n'

import type { PluginLocale } from '~/context/interface'

import { useState } from './state'

let locale

export const i18n = () => {
  const { state } = useState()
  locale = createI18n({
    locale: state.locale,
    fallbackLocale: 'en',
    legacy: false,
  })
  return locale
}

export const setLocale = (lang: PluginLocale) => {
  locale.global.locale.value = lang
}
