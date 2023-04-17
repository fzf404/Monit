/*
 * @Author: fzf404
 * @Date: 2022-10-03 16:54:16
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-17 21:19:01
 * @Description: update 初始化
 */

import fetch from 'node-fetch'

import { getVersion } from '~/server/app'
import { openURL, sendAlert, sendConfirm } from '~/server/system'

const UpdateAPI = 'https://api.github.com/repos/fzf404/monit/releases/latest'
const DownloadURL = 'https://github.com/fzf404/monit/releases/latest'

// 检查更新
export const checkUpdate = (quite: boolean = true) => {
  // 请求接口
  fetch(UpdateAPI).then((res) => {
    // 解析数据
    res.json().then((data) => {
      const { tag_name } = data as any
      // 判断版本
      if (tag_name !== `v${getVersion()}`) {
        sendConfirm(`${tag_name.slice(1)}`, '有新版本可用，是否前往下载？', () => openURL(DownloadURL))
      } else {
        !quite && sendAlert(getVersion(), '当前已是最新版本！')
      }
    })
  })
}
