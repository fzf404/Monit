/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-28 10:56:20
 * @Description: render 进程
 */

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './app.vue'
import router from './router'

import '@/themes/base.scss'

createApp(App).use(router).use(createPinia()).mount('#app')
