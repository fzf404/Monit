/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-20 21:21:12
 * @Description: plugin 配置
 */

import { debugFilter } from './utils'

// 窗口网格大小
const BasicMesh = 100

// 插件配置
interface plugin {
  icon: string
  name: string
  size: number[]
  description: string
  debug?: boolean
}

const createSize = (size: number[]): number[] => {
  return size.map((item) => item * BasicMesh)
}

// 插件列表
export const pluginList: plugin[] = debugFilter([
  { icon: '😺', name: 'github', size: createSize([4, 2]), description: '监控', debug: true },
  { icon: '🎵', name: 'music', size: createSize([4, 2]), description: '音乐' },
  { icon: '📝', name: 'todo', size: createSize([2, 3]), description: '待办' },
  { icon: '🏅', name: 'juejin', size: createSize([4, 3]), description: '监控' },
  { icon: '⏱️', name: 'clock', size: createSize([4, 2]), description: '时钟' },
  { icon: '🏞️', name: 'image', size: createSize([4, 3]), description: '图像', debug: true },
  { icon: '📷', name: 'camera', size: createSize([4, 3]), description: '相机' },
  { icon: '⚙️', name: 'config', size: createSize([2, 3]), description: '配置' },
  { icon: '👏', name: 'guide', size: createSize([2, 2]), description: '欢迎' },
  { icon: '🔘', name: 'count', size: createSize([2, 2]), description: '计数' },
  { icon: '💬', name: 'chat', size: createSize([4, 4]), description: '问答', debug: true },
  { icon: '🤖', name: 'vtube', size: createSize([4, 3]), description: '跟踪', debug: true },
  { icon: '⛅', name: 'weather', size: createSize([4, 2]), description: '天气', debug: true },
  { icon: '📺', name: 'bilibili', size: createSize([2, 2]), description: '监控', debug: true },
  { icon: '📅', name: 'course', size: createSize([4, 3]), description: '课表', debug: true }
])

// 判断插件存在
export const pluginExist = (name: string): boolean => {
  return pluginList.some((item) => item.name === name)
}

// 获取插件配置
export const getPluginConfig = (name: string): plugin => {
  return pluginList.find((item) => item.name === name) as plugin
}
