import { useState } from '@/configs/state'

export default () => {
  const { action } = useState()

  action.setLoadingRemark('Test Loading...')

  action.setQRCodeRemark('Test Loaded')
  action.setQRCodeURL('https://img.fzf404.art/monit/qrcode.webp')

  action.toggleLoading()

  setInterval(() => {
    action.toggleLoading()
    action.toggleQRCode()
  }, 2000)
}
