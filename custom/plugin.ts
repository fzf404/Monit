/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-10-27 22:39:35
 * @Description: plugin 配置
 */
interface pluginList {
  name: string
  size: number[]
  min?: number[]
  max?: number[]
  description: string
  debug?: boolean
}

/**
 * @description: 插件列表
 */
const plugin: pluginList[] = [
  { name: 'github', size: [4, 2], description: '监控' },
  { name: 'juejin', size: [4, 3], description: '监控' },
  { name: 'music', size: [4, 2], description: '音乐' },
  { name: 'todo', size: [2, 3], max: [4, 3], description: '待办' },
  { name: 'clock', size: [4, 2], description: '时钟' },
  { name: 'image', size: [4, 3], max: [8, 6], description: '图像' },
  { name: 'camera', size: [4, 3], description: '相机' },
  { name: 'welcome', size: [2, 2], description: '欢迎' },
  { name: 'count', size: [2, 2], description: '计数器' },
  { name: 'config', size: [2, 3], description: '设置' },
  // debug 不会被打包
  { name: 'weather', size: [4, 2], description: '天气', debug: true },
  { name: 'live2d', size: [4, 3], description: '角色跟踪', debug: true },
  { name: 'bilibili', size: [2, 2], description: '监控', debug: true },
]

// 生产模式不开启 debug 插件
export const pluginList = plugin.filter(({ debug }) => {
  if (process.env.NODE_ENV === 'development') {
    return true
  } else {
    return !debug
  }
})
