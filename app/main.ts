import { createApp } from 'vue'

import app from './app.vue'
import router from './router'

import 'uno.css'
import './style.scss'

createApp(app).use(router).mount('#app')
