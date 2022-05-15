import { createApp } from 'vue'
import router from './utils/router'
import App from './layout/Layout'
import './assets/tailwind.css'

createApp(App).use(router).mount('#app')
