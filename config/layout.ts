/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-02 22:19:52
 * @Description: layout 配置
 */

import { debugFilter } from './utils'

// 布局配置
interface layout {
  name: string
  debug?: boolean
}

// 布局列表
export const layoutList: layout[] = debugFilter([{ name: 'maco' }, { name: 'wine' }])
