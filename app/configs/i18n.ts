import { createI18n } from 'vue-i18n'

const locale = navigator.language.startsWith('zh') ? 'zh' : 'en'

const i18n = createI18n({
  locale,
  fallbackLocale: 'en',
  legacy: false,
})

export default i18n
