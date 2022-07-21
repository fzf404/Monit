/*
 * @Author: fzf404
 * @Date: 2022-07-21 00:41:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-22 00:54:54
 * @Description: store 状态管理
 */
import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    network: true,
    setting: false,
  }),
})
