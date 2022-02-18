module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        artifactName: '${productName}-${version}-${os}-${arch}.${ext}',
        mac: {
          target: {
            arch: ['x64', 'arm64'],
            target: 'dmg'
          }
        }
      }
    }
  }
}