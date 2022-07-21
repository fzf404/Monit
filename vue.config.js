/*
 * @Author: fzf404
 * @Date: 2022-06-18 17:15:15
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-21 11:39:45
 * @Description: vue-cli 配置
 */
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const config = {
  configureWebpack: {
    // electron 入口点
    entry: './core/main.js',
  },

  chainWebpack: (config) => {
    // 配置别名
    config.resolve.alias.set('@', resolve('app')).set('#', resolve('custom')).set('~', resolve('lib'))
    // svg 加载
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.delete('type')
    svgRule.use('svg-vue3-loader').loader('svg-vue3-loader')
  },
  pluginOptions: {
    // electron 打包配置
    electronBuilder: {
      // node 集成
      nodeIntegration: true,

      // 自定义通信协议
      customFileProtocol: 'monit://./',
      // 允许外部访问
      externals: ['picgo'],
      // 主进程入口
      mainProcessFile: 'core/main.js',
      // 渲染进程入口
      rendererProcessFile: 'app/main.js',
      chainWebpackMainProcess: (config) => {
        // 配置别名
        config.resolve.alias.set('@', resolve('app')).set('#', resolve('custom')).set('~', resolve('lib'))
      },
      // 构建选项
      builderOptions: {
        productName: 'Monit', // 应用名
        icon: 'public/icons/icon.png', // 图标
        appId: 'top.fzf404.monit', // app id
        artifactName: '${productName}-${version}-${os}-${arch}.${ext}', // 打包命名方式
        // 发布地址
        publish: ['github'],
        win: {
          target: ['nsis', '7z'],
        },
        linux: {
          target: 'AppImage',
        },
        mac: {
          target: {
            target: 'dmg',
            arch: ['x64', 'arm64'],
          },
        },
      },
    },
  },
}

if (process.env.NODE_ENV === 'development') {
  // 热重载配置
  config.pluginOptions.electronBuilder.mainProcessWatch = ['core/*.js']
}

module.exports = { ...config }
