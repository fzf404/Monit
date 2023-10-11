import { defineStore } from 'pinia'
import { reactive } from 'vue'

import { locale } from '@/configs/i18n'
import type { PluginData } from '~/context/interface'

import type { State } from './interface'
import { setWatch } from './watch'

const control = (await window.api?.invoke(
  'get-plugin-data',
  'control',
)) as PluginData['control']

export const useState = defineStore('state', () => {
  const state = reactive<State>({
    locale: locale,
    sticky: control?.sticky ?? false,
    theme:
      control?.theme ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'),
    navbar: {
      show: true,
      dragging: false,
      sticky: control?.navbar ?? true,
    },
  })

  setWatch(state)

  return { state }
})
