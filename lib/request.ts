/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-09-17 20:03:54
 * @Description: axios 封装
 */

import axios from 'axios'

import { useStore } from '@/store'

const store = useStore()

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
      store.network = true
      // 返回数据
      return res.data
    },
    (err) => {
      // 请求错误
      store.network = false
    }
  )
  return service
}

export default request
