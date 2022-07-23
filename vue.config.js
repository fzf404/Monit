/*
 * @Author: fzf404
 * @Date: 2022-06-18 17:15:15
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-23 22:40:27
 * @Description: vue-cli 配置
 */
const path = require('path')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const config = {
  configureWebpack: {
    // electron 入口点
    entry: './core/main.js',
  },
  configureWebpack: {
    plugins: [
      // 拷贝静态文件到目标文件
      // new CopyWebpackPlugin({
      //   patterns: [
      //     {
      //       from: './node_modules/@mediapipe/holistic/holistic_solution_packed_assets.data',
      //       to: 'node_modules/@mediapipe/holistic/holistic_solution_packed_assets.data',
      //     },
      //   ],
      // }),
    ],
  },
  chainWebpack: (config) => {
    // 配置别名
    config.resolve.alias.set('~', resolve('lib')).set('@', resolve('app')).set('#', resolve('custom'))
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
      // 主进程入口
      mainProcessFile: 'core/main.js',
      // 渲染进程入口
      rendererProcessFile: 'app/main.js',
      chainWebpackMainProcess: (config) => {
        // 配置别名
        config.resolve.alias.set('~', resolve('lib')).set('@', resolve('app')).set('#', resolve('custom'))
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
  config.pluginOptions.electronBuilder.mainProcessWatch = ['core/*.js', 'vue.config.js']
}

module.exports = { ...config }
