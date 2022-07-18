import { systemPreferences } from 'electron'

// 权限管理
export const premission = async (name) => {
  // 分配权限
  if (process.platform === 'darwin') {
    if (name === 'camera') {
      await systemPreferences.askForMediaAccess('camera')
      await systemPreferences.askForMediaAccess('microphone')
    }
    if (name === 'live2d') {
      await systemPreferences.askForMediaAccess('camera')
    }
  }
}
