import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: navigator.language.startsWith('zh') ? 'zh' : 'en',
  fallbackLocale: 'en',
  legacy: false,
})

export default i18n
