/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-08-11 15:58:35
 * @Description: render 进程
 */
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './app'
import router from './router'

import './assets/tailwind.css'

createApp(App).use(router).use(createPinia()).mount('#app')
