/*
 * @Author: fzf404
 * @Date: 2022-07-21 00:41:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-08-12 21:46:30
 * @Description: store 状态管理
 */
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    network: true, // 网络状态
    setting: {
      has: false, // 是否有设置
      show: false, // 是否显示设置
    },
  }),
})
