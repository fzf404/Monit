/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-09-12 00:42:39
 * @Description: 数值分析
 */

// 仓库模型
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
export const getArrDiff = <T>(arr1: Array<T>, arr2: Array<T>): Array<T> => {
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
 * @param {string} source
 * @param {string} target
 * @return {*}
 */
export const getArrDiffKey = <T>(arr1: Array<T>, arr2: Array<T>, source: keyof T, target: keyof T): Array<T> => {
  return arr2.filter((items) => {
    return !arr1.some((item) => {
      return items[source] === item[source] && items[target] === item[target]
    })
  })
}
