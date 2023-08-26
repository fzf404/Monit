const { notarize } = require('@electron/notarize')

module.exports = async (context) => {
  if (context.electronPlatformName !== 'darwin') return

  try {
    await notarize({
      appBundleId: 'art.fzf404.monit',
      appPath: `${context.appOutDir}/${context.packager.appInfo.productFilename}.app`,
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_ID_PASSWORD,
    })
  } catch (error) {
    console.error(error)
  }
}
