/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-30 10:36:46
 * @Description: plugin 配置
 */

import { debugFilter } from './utils'

// 插件配置
interface plugin {
  name: string
  size: number[]
  description: string
  debug?: boolean
}

// 插件列表
export const pluginList: plugin[] = debugFilter([
  { name: 'config', size: [2, 3], description: '设置' },
  { name: 'github', size: [4, 2], description: '监控' },
  { name: 'juejin', size: [4, 3], description: '监控' },
  { name: 'music', size: [4, 2], description: '音乐' },
  { name: 'todo', size: [2, 3], description: '待办' },
  { name: 'clock', size: [4, 2], description: '时钟' },
  { name: 'image', size: [4, 3], description: '图像' },
  { name: 'camera', size: [4, 3], description: '相机' },
  { name: 'welcome', size: [2, 2], description: '欢迎' },
  { name: 'count', size: [2, 2], description: '计数器' },
  { name: 'chatgpt', size: [4, 4], description: '问答', debug: true },
  { name: 'live2d', size: [4, 3], description: '跟踪', debug: true },
  { name: 'weather', size: [4, 2], description: '天气', debug: true },
  { name: 'bilibili', size: [2, 2], description: '监控', debug: true }
])

// 判断插件存在
export const pluginExist = (name: string): boolean => {
  return pluginList.some((item) => item.name === name)
}

// 获取插件配置
export const getPluginConfig = (name: string): plugin => {
  return pluginList.find((item) => item.name === name) as plugin
}
