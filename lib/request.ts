/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-17 21:23:15
 * @Description: axios 封装
 */

import axios from 'axios'

import { main } from '@/pinia'

// 初始化全局状态
const pinia = main()

// 初始化请求
const request = (url: string) => {
  // 请求实例
  const service = axios.create({
    baseURL: url, // 基础路径
    timeout: 30000, // 超时时间
    withCredentials: true // 携带 Cookie
  })

  // 响应拦截
  service.interceptors.response.use(
    (res) => {
      // 响应成功
      pinia.online()
      // 返回数据
      return Promise.resolve(res.data)
    },
    (err) => {
      // 响应失败
      pinia.offline()
      // 返回错误
      return Promise.reject(err)
    }
  )

  return service
}

export default request
