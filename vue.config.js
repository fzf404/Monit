/*
 * @Author: fzf404
 * @Date: 2022-06-18 17:15:15
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-17 17:45:37
 * @Description: vue-cli 配置
 */

const config = {
  configureWebpack: {
    // electron 入口点
    entry: './core/main.js',
  },
  chainWebpack: (config) => {
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
      // 构建选项
      builderOptions: {
        productName: 'Monit', // 应用名
        icon: 'public/logo/icon.png', // 图标
        appId: 'top.fzf404.monit', // app id
        artifactName: '${productName}-${version}-${os}-${arch}.${ext}', // 打包命名方式
        linux: {
          target: 'AppImage',
          publish: ['github'],
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
  config.pluginOptions.electronBuilder.mainProcessWatch = ['core/*.js', 'custom/*.js']
}

module.exports = { ...config }
