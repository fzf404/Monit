const path = require('path')

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

const config = {
  configureWebpack: {
    // electron 入口
    entry: './core/main.js'
  },
  chainWebpack: (config) => {
    // import 别名
    config.resolve.alias.set('~', resolve('./')).set('@', resolve('app'))
    // svg 加载
    config.module.rule('svg').delete('type').use('svg-vue3-loader').loader('svg-vue3-loader')
  },
  pluginOptions: {
    // electron 打包配置
    electronBuilder: {
      // 输出路径
      outputDir: 'release',
      // node 集成
      nodeIntegration: true,
      // 自定义通信协议
      customFileProtocol: 'monit://./',
      // 主进程入口
      mainProcessFile: 'core/main.ts',
      // 渲染进程入口
      rendererProcessFile: 'app/main.ts',
      chainWebpackMainProcess: (config) => {
        config.resolve.alias.set('~', resolve('./'))
      },
      // 构建选项
      builderOptions: {
        // 应用名
        productName: 'Monit',
        // 图标
        icon: 'public/img/icon.png',
        // 应用 ID
        appId: 'monit.fzf404.art',
        // 打包命名
        artifactName: '${productName}-${version}-${os}-${arch}.${ext}',
        // 发布地址
        publish: ['github'],
        // 多平台配置
        win: {
          target: ['nsis', '7z']
        },
        linux: {
          target: 'AppImage'
        },
        mac: {
          target: {
            target: 'dmg',
            arch: ['x64', 'arm64']
          },
          entitlements: 'entitlements.mac.plist',
          extendInfo: {
            NSMicrophoneUsageDescription: '请提供您的麦克风权限！',
            NSCameraUsageDescription: '请提供您的相机权限！'
          }
        }
      }
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  // 热重载配置
  config.pluginOptions.electronBuilder.mainProcessWatch = ['config/*.ts', 'core/*.ts', 'event/*.ts', 'server/*.ts']
}

module.exports = { ...config }
