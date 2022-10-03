/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-10-03 18:49:56
 * @Description: render 进程
 */
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './app'
import router from './router'

// 引入 tailwind 样式
import './assets/tailwind.css'

// 引入主题样式
import '@/themes/basic.scss'

createApp(App).use(router).use(createPinia()).mount('#app')
