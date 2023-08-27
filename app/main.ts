import { createApp } from 'vue'

import app from './app.vue'
import i18n from './i18n'
import router from './router'

import '@unocss/reset/tailwind.css'
import 'uno.css'

createApp(app).use(i18n).use(router).mount('#app')
