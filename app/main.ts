import '@unocss/reset/tailwind.css'
import '@/styles/layout.scss'
import 'uno.css'

import { createApp } from 'vue'

import { pinia } from '@/configs/pinia'
import { router } from '@/configs/router'
import { i18n } from '~/app/configs/i18n'

import app from './app.vue'

createApp(app).use(pinia).use(router).use(i18n).mount('#app')
