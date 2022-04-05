/*
 * @Author: fzf404
 * @Date: 2022-02-18 17:38:10
 * @LastEditTime: 2022-04-04 16:26:06
 * @Description: 工具函数
 */

/**
 * @description: 获取两个数组间的差集
 * @param {*} arr1
 * @param {*} arr2
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
 */
export const getArrDiffKey = (arr1, arr2, key) => {
  return arr2.filter((items) => {
    return !arr1.some((item) => {
      return items['repo'] === item['repo'] && items[key] === item[key]
    })
  })
}
