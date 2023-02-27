/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-02-27 13:57:13
 * @Description: theme 配置
 */
import { debugFilter } from './config'

// 主题配置
interface theme {
  name: string
  debug?: boolean
}

// 主题列表
const themes: theme[] = [{ name: 'dark' }, { name: 'light' }, { name: 'punk' }]

export const themeList = debugFilter(themes)
