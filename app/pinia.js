/*
 * @Author: fzf404
 * @Date: 2022-07-21 00:41:12
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-10-31 13:41:11
 * @Description: store 状态管理
 */
import { defineStore } from 'pinia'

export const main = defineStore('main', {
  state: () => {
    return {
      network: true, // 网络状态
      setting: {
        has: false, // 存在设置
        show: false, // 显示设置
      },
    }
  },
  getters: {
    hasNetwork: (state) => state.network,
    hasSetting: (state) => state.setting.has,
    showSetting: (state) => state.setting.show,
  },
  actions: {
    // 网络在线
    online() {
      this.network = true
    },
    // 网络异常
    offline() {
      this.network = false
    },
    // 存在设置
    initSetting() {
      this.setting.has = true
    },
    // 展示设置
    openSetting() {
      this.setting.show = true
    },
    // 隐藏设置
    closeSetting() {
      this.setting.show = false
    },
    // 翻转设置
    toggleSetting() {
      this.setting.show = !this.setting.show
    },
  },
})
