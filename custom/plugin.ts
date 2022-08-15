/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-08-11 16:07:30
 * @Description: plugin 配置
 */
interface pluginList {
  name: string
  size: number[]
  description: string
  debug?: boolean
}

/**
 * @description: 插件列表
 * @return {*}
 */
export const pluginList: pluginList[] = [
  { name: 'welcome', size: [2, 2], description: '欢迎' },
  { name: 'count', size: [2, 2], description: '计数器' },
  { name: 'github', size: [4, 2], description: '监控' },
  { name: 'clock', size: [4, 2], description: '翻页时钟' },
  { name: 'todo', size: [2, 3], description: '待办' },
  { name: 'camera', size: [4, 3], description: '相机' },
  // debug 模式下 build 时不会被打包
  { name: '_config', size: [2, 3], description: '设置', debug: true },
  { name: 'live2d', size: [4, 3], description: '角色跟踪', debug: true },
  { name: 'bilibili', size: [2, 2], description: '监控', debug: true },
  { name: 'juejin', size: [4, 4], description: '监控',debug: true},
  { name: 'music', size: [4, 2], description: '音乐', debug: true },
]
