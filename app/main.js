/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-20 15:39:18
 * @Description: 渲染进程
 */
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './app'
import './assets/tailwind.css'
import router from './router'

createApp(App).use(router).use(createPinia()).mount('#app')
