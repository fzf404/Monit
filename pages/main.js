/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-05-30 20:05:33
 * @Description: 渲染器
 */
import { createApp } from 'vue'
import router from './utils/router'
import App from './app'
import './assets/tailwind.css'

createApp(App).use(router).mount('#app')
