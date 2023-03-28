/*
 * @Author: fzf404
 * @Date: 2022-10-03 16:54:16
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-28 10:50:58
 * @Description: devtool 初始化
 */

import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

// 初始化调试工具
export const initDevtools = () => {
  try {
    installExtension(VUEJS_DEVTOOLS)
  } catch (err: any) {
    console.error('Vue Devtools 安装失败：', err.message)
  }
}
