/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-03-15 15:37:55
 * @Description: theme 配置
 */
import { debugFilter } from './utils'

// 主题配置
interface theme {
  name: string
  debug?: boolean
}

// 主题列表
export const themeList: theme[] = debugFilter([{ name: 'dark' }, { name: 'light' }, { name: 'punk' }])
