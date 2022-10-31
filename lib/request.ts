/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-10-31 13:15:35
 * @Description: axios 封装
 */

import axios from 'axios'

import { main } from '@/pinia'

// 初始化 pinia
const pinia = main()

// 初始化请求
const request = (url: string) => {
  // axios 实例
  const service = axios.create({
    baseURL: url, // 基本路径
    timeout: 30000, // 超时时间
    withCredentials: true, // 携带 Cookie
  })

  // 响应拦截
  service.interceptors.response.use(
    (res) => {
      // 响应成功
      pinia.online()
      // 返回数据
      return res.data
    },
    (err) => {
      // 响应失败
      pinia.offline()
    }
  )
  return service
}

export default request
