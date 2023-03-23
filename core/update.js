/*
 * @Author: fzf404
 * @Date: 2022-10-03 16:54:16
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-15 17:04:56
 * @Description: update 初始化
 */
import fetch from 'node-fetch'

import { app, Notification, shell } from 'electron'

const UpdateAPI = 'https://api.github.com/repos/fzf404/monit/releases/latest'
const DownloadURL = 'https://github.com/fzf404/monit/releases/latest'

// 检查更新
export const checkUpdate = () => {
  // 请求 API
  fetch(UpdateAPI).then((res) => {
    // 解析 JSON
    res.json().then((data) => {
      const { tag_name } = data
      // 判断版本
      if (tag_name !== `v${app.getVersion()}`) {
        // 构造通知
        const notification = new Notification({
          title: 'Monit - update',
          body: '有新版本可用！'
        })
        // 发送通知
        notification.show()
        // 跳转下载
        notification.on('click', () => {
          shell.openExternal(DownloadURL)
        })
      }
    })
  })
}
