/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-06-12 15:55:40
 * @Description: 插件配置
 */

/**
 * @param {string} name 插件名称
 * @param {Array} size [插件宽度, 插件高度]
 * @param {string} description 插件描述
 * @param {string} debug 调试模式
 */
export const pluginList = [
  { name: 'welcome', size: [1, 1], description: '欢迎' },
  { name: 'github', size: [2, 1], description: '监控' },
  { name: 'count', size: [1, 1], description: '计数器' },
  { name: 'clock', size: [2, 1], description: '时钟', debug: true },
  { name: 'music', size: [2, 1], description: '音乐', debug: true },
  { name: 'bilibili', size: [1, 1], description: '监控', debug: true },
  { name: 'todo', size: [1, 2], description: '待办', debug: true },
]
