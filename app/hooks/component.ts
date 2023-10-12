import type { SettingData, SettingMenu } from './interface'
import { useState } from './state'

const { state } = useState()

type UseLoadingProps = {
  show?: boolean
  remark?: string | string[]
}

export const useLoading = ({ remark, show = false }: UseLoadingProps) => {
  state.loading = { show, remark }
  return state.loading
}

type UseQRCodeProps = {
  url: string
  show?: boolean
  remark?: string
}

export const useQRCode = ({ url, remark, show = false }: UseQRCodeProps) => {
  state.qrcode = { show, url, remark }
  return state.qrcode
}

type UseSettingProps<T extends SettingMenu> = {
  menu: T
  show?: boolean
  callback?: (data: SettingData) => void
}

type UseSettingReturn<T extends SettingMenu> = {
  menu: T
  show: boolean
  callback?: (data: SettingData) => void
}

export const useSetting = async <T extends SettingMenu>({
  menu,
  callback,
  show = false,
}: UseSettingProps<T>): Promise<UseSettingReturn<T>> => {
  const data = await window.api?.invoke('get-plugin-data', 'setting')

  for (const key in menu) {
    if (data && data[key] !== undefined) {
      menu[key].value = data[key]
    }
    menu[key].cache = menu[key].value
  }

  state.setting = { show, menu, callback }

  return state.setting as UseSettingReturn<T>
}
