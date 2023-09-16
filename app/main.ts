import '@unocss/reset/tailwind.css'
import '@/styles/layout.scss'
import 'uno.css'

import { createApp } from 'vue'

import i18n from '@/configs/locale'
import pinia from '@/configs/pinia'
import router from '@/configs/router'

import app from './app.vue'

createApp(app).use(i18n).use(pinia).use(router).mount('#app')
