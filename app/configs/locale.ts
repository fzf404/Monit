import type { I18n } from 'vue-i18n'
import { createI18n } from 'vue-i18n'

import type { PluginLocale } from '~/context/interface'

import { useState } from './state'

let locale: I18n<
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>,
  PluginLocale,
  false
>

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
