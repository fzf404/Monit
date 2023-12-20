import { defineStore } from 'pinia'
import { reactive } from 'vue'

import { getPluginStorageData } from '@/utils/storage'
import type { LocaleMessage } from '~/context/types'

import { useLayout } from './layout'

export type SettingMenu = Record<
  string,
  {
    label: LocaleMessage
    help?: string
    show?: boolean
  } & (
    | {
        type: 'text'
        value: string
        length?: number
      }
    | {
        type: 'number'
        value: number
        length?: number
      }
    | {
        type: 'switch'
        value: boolean
      }
    | {
        type: 'select'
        value: string
        options: Record<string, string>
      }
    | {
        type: 'button'
        value: string
        click: () => Promise<string>
      }
  )
>

type UseSetting = {
  (): { setting: SettingMenu }
  <T extends SettingMenu>(menu: T): { setting: T }
}

const data = await getPluginStorageData('setting')

export const useSetting = (<T extends SettingMenu>(menu?: T) => {
  return menu
    ? defineStore('setting', () => {
        const setting = reactive(menu)

        for (const key in setting) {
          setting[key].value = data?.[key] ?? setting[key].value
        }

        const { layout } = useLayout()

        layout.setting = true

        return { setting }
      })()
    : defineStore('setting', () => {})()
}) as UseSetting
