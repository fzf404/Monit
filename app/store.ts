/*
 * @Author: fzf404
 * @Date: 2022-07-21 00:41:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-31 21:47:32
 * @Description: store 状态管理
 */
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    network: true, // 网络状态
    setting: {
      has: false, // 是否有设置
      show: false, // 是否显示设置
      // TODO 打开其他窗口
    },
  }),
})
