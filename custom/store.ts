/*
 * @Author: fzf404
 * @Date: 2022-07-21 00:41:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-23 22:36:30
 * @Description: store 状态管理
 */
import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    network: true, // 网络状态
    setting: false, // 设置窗口状态

    config: null, // 配置信息
    settingList: null, // 设置列表
  }),
})
