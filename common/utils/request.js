/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-06-29 11:01:54
 * @Description: axios 请求封装
 */

import axios from 'axios'

const request = (url) => {
  // axios 实例
  const service = axios.create({
    baseURL: url, // 基本路径
    timeout: 30000, // 超时时间
  })
  // 响应拦截
  service.interceptors.response.use(
    (res) => {
      // 返回数据
      return res.data
    },
    (err) => {
      // 返回错误
      return Promise.reject(err.message)
    }
  )
  return service
}

export default request
