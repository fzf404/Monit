import { defineStore } from 'pinia'
import { reactive } from 'vue'

import { getPluginStorageData } from '@/utils/storage'
import type { LocaleMessage } from '~/types/constant'

import { useLayout } from './layout'

export type SettingMenu = Record<
  string,
  | {
      type: 'text'
      label: LocaleMessage
      value: string
      help?: string
      show?: boolean
      length?: number
    }
  | {
      type: 'number'
      label: LocaleMessage
      value: number
      help?: string
      show?: boolean
      length?: number
    }
  | {
      type: 'switch'
      label: LocaleMessage
      value: boolean
      help?: string
      show?: boolean
    }
  | {
      type: 'select'
      label: LocaleMessage
      value: string
      options: Record<string, string>
      help?: string
      show?: boolean
    }
  | {
      type: 'button'
      label: LocaleMessage
      value: string
      click: () => Promise<string>
      help?: string
      show?: boolean
    }
>

type UseSetting = {
  (): { setting: SettingMenu }
  <T extends SettingMenu>(menu: T): { setting: T }
}

const data = await getPluginStorageData('setting')

export const useSetting = (<T extends SettingMenu>(menu?: T) => {
  return defineStore('setting', () => {
    const setting = reactive(menu ?? {})

    for (const key in setting) {
      setting[key].value = data?.[key] ?? setting[key].value
    }

    const { layout } = useLayout()

    layout.setting = true

    return { setting }
  })()
}) as UseSetting
