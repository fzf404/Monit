/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-02-08 16:23:22
 * @Description: plugin 配置
 */

interface plugin {
  name: string
  size: number[]
  description: string
  debug?: boolean
}

interface layout {
  name: string
  debug?: boolean
}

interface theme {
  name: string
  debug?: boolean
}

// 插件列表
const plugins: plugin[] = [
  { name: 'github', size: [4, 2], description: '监控' },
  { name: 'juejin', size: [4, 3], description: '监控' },
  { name: 'music', size: [4, 2], description: '音乐' },
  { name: 'todo', size: [2, 3], description: '待办' },
  { name: 'clock', size: [4, 2], description: '时钟' },
  { name: 'image', size: [4, 3], description: '图像' },
  { name: 'camera', size: [4, 3], description: '相机' },
  { name: 'welcome', size: [2, 2], description: '欢迎' },
  { name: 'count', size: [2, 2], description: '计数器' },
  { name: 'config', size: [2, 3], description: '设置' },
  { name: 'weather', size: [4, 2], description: '天气', debug: true },
  { name: 'live2d', size: [4, 3], description: '跟踪', debug: true },
  { name: 'bilibili', size: [2, 2], description: '监控', debug: true },
]

// 布局列表
const layouts: layout[] = [{ name: 'maco' }, { name: 'wine' }]

// 主题列表
const themes: theme[] = [{ name: 'dark' }, { name: 'light' }, { name: 'punk' }]

// 调试过滤
const debugFilter = (list: any) => {
  return list.filter(({ debug }: any) => process.env.NODE_ENV === 'development' || !debug)
}

export const pluginList = debugFilter(plugins)
export const layoutList = debugFilter(layouts)
export const themeList = debugFilter(themes)
