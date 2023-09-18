import '@unocss/reset/tailwind.css'
import '@/styles/layout.scss'
import 'uno.css'

import { createApp } from 'vue'

import { i18n } from '@/configs/locale'
import { pinia } from '@/configs/pinia'
import { router } from '@/configs/router'

import app from './app.vue'

createApp(app).use(pinia()).use(router()).use(i18n()).mount('body')
