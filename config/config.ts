/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-02-27 14:21:29
 * @Description: config 工具
 */

// 配置过滤
export const debugFilter = (list: any) => {
  return list.filter(({ debug }: any) => process.env.NODE_ENV === 'development' || !debug)
}
