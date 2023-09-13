import { LoadingState, QRCodeState, SettingState, useState } from './state'

const state = useState()

export const useSetting = (
  setting: SettingState = {
    exist: true,
    show: false,
  },
) => {
  state.setting = setting
  return state.setting
}

export const useQRCode = (
  qrcode: QRCodeState = {
    exist: true,
    show: false,
  },
) => {
  state.qrcode = qrcode
  return state.qrcode
}

export const useLoading = (
  loading: LoadingState = {
    exist: true,
    show: false,
  },
) => {
  state.loading = loading
  return state.loading
}
