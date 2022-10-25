/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-10-16 21:59:44
 * @Description: render 进程
 */
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './app'
import router from './router'

import '@/themes/basic.scss'

createApp(App).use(router).use(createPinia()).mount('#app')
