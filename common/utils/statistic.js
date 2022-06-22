/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-05-30 20:04:32
 * @Description: 数值分析
 */

/**
 * @description: 获取两个数组间的差集
 * @param {*} arr1
 * @param {*} arr2
 * @return {*}
 */
export const getArrDiff = (arr1, arr2) => {
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
export const getArrDiffKey = (arr1, arr2, key) => {
  return arr2.filter((items) => {
    return !arr1.some((item) => {
      return items['repo'] === item['repo'] && items[key] === item[key]
    })
  })
}
