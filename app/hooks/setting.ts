import type { SettingMenu } from './interface'
import { useState } from './state'

const { state } = useState()

type UseSettingProps<T extends Record<string, SettingMenu>> = {
  menu: T
  show?: boolean
  callback?: () => void
}

type UseSettingReturn<T extends Record<string, SettingMenu>> = {
  menu: T
  show: boolean
  callback?: () => void
}

export const useSetting = async <T extends Record<string, SettingMenu>>({
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
