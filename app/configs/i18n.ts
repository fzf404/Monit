import { createI18n } from 'vue-i18n'

export const locale =
  (await window.api?.invoke('get-locale')) ??
  (navigator.language.startsWith('zh') ? 'cn' : 'en')

export const i18n = createI18n({
  locale,
  legacy: false,
  fallbackLocale: 'en',
})
