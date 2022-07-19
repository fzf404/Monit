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
