/*
 * @Author: fzf404
 * @Date: 2022-07-21 00:41:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-22 00:53:22
 * @Description: permissions 管理
 */
import { systemPreferences } from 'electron'

// 获取相机权限
export const getCameraAccess = async () => {
  if (systemPreferences.getMediaAccessStatus('camera') === 'granted') {
    return true
  } else {
    return process.platform === 'darwin' ? await systemPreferences.askForMediaAccess('camera') : false
  }
}

// 获取麦克风权限
export const getMicrophoneAccess = async () => {
  if (systemPreferences.getMediaAccessStatus('microphone') === 'granted') {
    return true
  } else {
    return process.platform === 'darwin' ? await systemPreferences.askForMediaAccess('microphone') : false
  }
}
