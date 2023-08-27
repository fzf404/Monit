import { createApp } from 'vue'

import i18n from '@/configs/locale'
import router from '@/configs/router'

import app from './app.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'

createApp(app).use(i18n).use(router).mount('#app')
