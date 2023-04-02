/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-02 23:57:16
 * @Description: statistic 数据分析
 */

/**
 * @description: 获取两个数组间的差集
 * @param { Array<T> } source 源数组
 * @param { Array<T> } target 目标数组
 * @return { Array<T> } 数组差集
 */
export const getArrDiff = <T>(source: Array<T>, target: Array<T>): Array<T> => {
  return target.filter((item) => !source.includes(item))
}

/**
 * @description: 获取两个数组间的某个值的差集
 * @param { Array<T> } sourceArray 源数组
 * @param { Array<T> } targetArray 目标数组
 * @param { keyof T } sourceKey 源数组的某个值
 * @param { keyof T } targetKey 目标数组的某个值
 * @return { Array<T> } 数组差集
 */
export const getArrDiffKey = <T>(
  sourceArray: Array<T>,
  targetArray: Array<T>,
  sourceKey: keyof T,
  targetKey: keyof T
): Array<T> => {
  return targetArray.filter((target) => {
    return !sourceArray.some((source) => {
      return target[sourceKey] === source[sourceKey] && target[targetKey] === source[targetKey]
    })
  })
}
