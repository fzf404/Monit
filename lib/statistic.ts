/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-10-27 18:49:56
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
 * @param { Array<T> } arr1 源数组
 * @param { Array<T> } arr2 目标数组
 * @return { Array<T> } 数组差集
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
 * @param { Array<T> } arr1 源数组
 * @param { Array<T> } arr2 目标数组
 * @return { Array<T> } 数组差集
 */
export const getArrDiffKey = <T>(arr1: Array<T>, arr2: Array<T>, source: keyof T, target: keyof T): Array<T> => {
  return arr2.filter((items) => {
    return !arr1.some((item) => {
      return items[source] === item[source] && items[target] === item[target]
    })
  })
}
