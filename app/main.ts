/* eslint-disable simple-import-sort/imports */
import { createApp } from 'vue'

import { i18n } from '@/configs/i18n'
import { pinia } from '@/configs/pinia'
import { router } from '@/configs/router'

import app from './app.vue'

import 'uno.css'
import '@unocss/reset/tailwind.css'

import '@/styles/layout.scss'

createApp(app).use(pinia).use(router).use(i18n).mount('#app')
