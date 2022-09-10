/*
 * @Author: fzf404
 * @Date: 2022-06-18 17:15:15
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-07 19:55:33
 * @Description: vue-cli 配置
 */
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const config = {
  configureWebpack: {
    // electron 入口
    entry: './core/main.js',
  },
  chainWebpack: (config) => {
    // 配置别名
    config.resolve.alias
      .set('@', resolve('app'))
      .set('~', resolve('lib'))
      .set('#', resolve('custom'))
      .set('root', resolve('./'))
      .set('core', resolve('core'))
    // svg 加载
    config.module.rule('svg').delete('type').use('svg-vue3-loader').loader('svg-vue3-loader')
  },
  pluginOptions: {
    // electron 打包配置
    electronBuilder: {
      // node 集成
      nodeIntegration: true,
      // 自定义通信协议
      customFileProtocol: 'monit://./',
      // 主进程入口
      mainProcessFile: 'core/main.js',
      // 渲染进程入口
      rendererProcessFile: 'app/main.js',
      // 路径别名
      chainWebpackMainProcess: (config) => {
        config.resolve.alias
          .set('@', resolve('app'))
          .set('~', resolve('lib'))
          .set('#', resolve('custom'))
          .set('root', resolve('./'))
          .set('core', resolve('core'))
      },
      // 构建选项
      builderOptions: {
        productName: 'Monit', // 应用名
        icon: 'public/icons/icon.png', // 图标
        appId: 'top.fzf404.monit', // app id
        artifactName: '${productName}-${version}-${os}-${arch}.${ext}', // 打包命名方式
        // 发布地址
        publish: ['github'],
        // 多平台打包设置
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
  config.pluginOptions.electronBuilder.mainProcessWatch = ['core/*.js', 'custom/*.ts']
}

module.exports = { ...config }
