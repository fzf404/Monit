const config = {
  configureWebpack: {
    // electron 入口点
    entry: './pages/main.js',
  },
  chainWebpack: (config) => {
    // svg 加载
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('vue-loader-v16').loader('vue-loader-v16').end().use('vue-svg-loader').loader('vue-svg-loader')
  },
  pluginOptions: {
    // electron 打包配置
    electronBuilder: {
      nodeIntegration: true,
      // 主进程入口
      mainProcessFile: 'app/main.js',
      // 渲染进程入口
      rendererProcessFile: 'pages/main.js',
      // 构建选项
      builderOptions: {
        productName: 'Monit',
        appId: 'com.fzf404.monit',
        artifactName: '${productName}-${version}-${os}-${arch}.${ext}',
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
  config.pluginOptions.electronBuilder.mainProcessWatch = ['app/*.js', 'common/*.js']
}

module.exports = { ...config }
