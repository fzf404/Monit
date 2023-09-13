import { createApp } from 'vue'

import i18n from '@/utils/i18n'
import pinia from '@/utils/pinia'
import router from '@/utils/router'

import app from './app.vue'

import '@unocss/reset/tailwind.css'
import '@/styles/layout.scss'
import 'uno.css'

createApp(app).use(i18n).use(pinia).use(router).mount('#app')
