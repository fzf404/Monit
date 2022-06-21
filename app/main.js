/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-06-21 09:49:30
 * @Description: 渲染进程
 */
import { createApp } from 'vue'
import App from './app'
import './assets/tailwind.css'
import router from './utils/router'

createApp(App).use(router).mount('#app')
