import { useQRCode } from '~/app/hooks/component'

export default () => {
  const qrcode = useQRCode({
    url: 'https://img.fzf404.art/monit/qrcode.webp',
    remark: 'Test Loaded',
  })

  setInterval(() => {
    qrcode.show = !qrcode.show
  }, 2000)
}
