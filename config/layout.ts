/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-02-27 14:03:11
 * @Description: plugin 配置
 */

import { debugFilter } from './config'

// 布局配置
interface layout {
  name: string
  debug?: boolean
}

// 布局列表
const layouts: layout[] = [{ name: 'maco' }, { name: 'wine' }]

export const layoutList = debugFilter(layouts)
