import { createI18n } from 'vue-i18n'

// locale = 'en'
const locale = navigator.language.startsWith('zh') ? 'cn' : 'en'

const i18n = createI18n({
  locale: locale,
  fallbackLocale: 'en',
  legacy: false,
})

export default i18n
