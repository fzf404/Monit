import { createApp } from 'vue'

import i18n from '@/configs/i18n'
import pinia from '@/configs/pinia'
import router from '@/configs/router'

import app from './app.vue'

import '@unocss/reset/tailwind.css'
import './themes/dark.scss'
import 'uno.css'

createApp(app).use(i18n).use(pinia).use(router).mount('#app')
