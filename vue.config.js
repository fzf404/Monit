const config = {
  // 设置入口点
  configureWebpack: {
    entry: './pages/main.js',
  },
  chainWebpack: (config) => {
    // svg 加载
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('vue-loader-v16').loader('vue-loader-v16').end().use('vue-svg-loader').loader('vue-svg-loader')
  },
  // electron 打包
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'app/main.js',
      rendererProcessFile: 'pages/main.js',
      nodeIntegration: true,
      builderOptions: {
        appId: 'com.fzf404.monit',
        productName: 'Monit',
        artifactName: '${productName}-${version}-${os}-${arch}.${ext}',
        linux: {
          target: 'AppImage',
          publish: ['github'],
        },
        mac: {
          target: {
            arch: ['x64', 'arm64'],
            target: 'dmg',
          },
        },
      },
    },
  },
}

if (process.env.NODE_ENV === 'development') {
  // 热重载配置
  config.pluginOptions.electronBuilder.mainProcessWatch = ['app/*.js']
}

module.exports = { ...config }
