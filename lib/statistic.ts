/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-27 17:18:53
 * @Description: 数值分析
 */

interface repo {
  repo: string
  star: number
  fork: number
}
/**
 * @description: 获取两个数组间的差集
 * @param {*} arr1
 * @param {*} arr2
 * @return {*}
 */
export const getArrDiff = (arr1: Array<any>, arr2: Array<any>): Array<any> => {
  return arr2.filter((items) => {
    return !arr1.some((item) => {
      return JSON.stringify(items) === JSON.stringify(item)
    })
  })
}

/**
 * @description: 获取两个数组间的某个 key 的差集
 * @param {*} arr1
 * @param {*} arr2
 * @param {*} key
 * @return {*}
 */
export const getArrDiffKey = (arr1: repo[], arr2: repo[], key: 'star' | 'fork'): Array<repo> => {
  return arr2.filter((items) => {
    return !arr1.some((item) => {
      return items.repo === item.repo && items[key] === item[key]
    })
  })
}
