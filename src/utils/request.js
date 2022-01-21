/*
 * @Author: fzf404
 * @Date: 2022-01-21 20:56:33
 * @LastEditTime: 2022-01-21 21:59:33
 * @Description: 封装前端请求
 */

import axios from 'axios'

async function request(url, options) {
  // axios 实例
  const service = axios.create({
    baseURL: 'https://api.github.com', // base url
    timeout: 6000, // 超时时间
  })
  // 请求拦截
  service.interceptors.request.use((config) => {
    // 设置请求头等信息
    if (options && options.body) {
      config.data = options.body
    }
    return config
  })
  // 返回拦截
  service.interceptors.response.use(
    (res) => {
      // 返回数据
      return res.data
    },
    (err) => {
      return Promise.reject(err.message)
    }
  )
  return service(url, options)
}

export default request
