module.exports = {
  // svg 加载
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule
      .use('vue-loader-v16')
      .loader('vue-loader-v16')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },
  // electron 打包
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        artifactName: '${productName}-${version}-${os}-${arch}.${ext}',
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
