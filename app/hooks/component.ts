import type { SettingMenus } from './interface'
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

type UseSettingProps<T extends SettingMenus> = {
  menu: T
  show?: boolean
  callback?: () => void
}

type UseSettingReturn<T extends SettingMenus> = {
  menu: T
  show: boolean
  callback?: () => void
}

export const useSetting = async <T extends SettingMenus>({
  menu,
  callback,
  show = false,
}: UseSettingProps<T>): Promise<UseSettingReturn<T>> => {
  const data = await window.api?.invoke('get-plugin-data', 'setting')

  for (const key in menu) {
    if (data && data[key] !== undefined) {
      menu[key].value = data[key]
    }
    menu[key].temp = menu[key].value
  }

  state.setting = { show, menu, callback }

  return state.setting as UseSettingReturn<T>
}
