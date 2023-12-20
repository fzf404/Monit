import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import {
  movePlugin,
  setPluginTop,
  watchPluginBlur,
  watchPluginLocale,
} from '@/utils/plugin'
import { getPluginStorageData, setPluginStorageData } from '@/utils/storage'
import { getLocale, getPlatform, getTheme } from '@/utils/system'

const platform = await getPlatform()

const data = await getPluginStorageData('control')

const store = {
  top: data?.top ?? false,
  lock: data?.lock ?? true,
  theme: data?.theme ?? getTheme(),
  locale: data?.locale ?? getLocale(),
}

export const initControl = (layout: { control: boolean }) => {
  const { locale } = useI18n()

  layout.control = store.lock
  locale.value = store.locale
  document.body.dataset.theme = store.theme
  document.body.dataset.platform = platform

  if (!layout.control) {
    const showControl = () => {
      layout.control = true
      document.removeEventListener('mousemove', showControl)
    }
    document.addEventListener('mousemove', showControl)
  }
}

export const useControl = defineStore('control', () => {
  const { locale } = useI18n()

  const control = reactive({
    setting: false,
    dragging: false,
    top: store.top,
    show: store.lock,
    lock: store.lock,
    theme: store.theme,
    locale: store.locale,
  })

  document.addEventListener('mousemove', (event) => {
    console.log(event)
    const visable = event.clientY < 32
    control.show = control.lock || control.dragging || visable
  })

  watch(
    () => control.top,
    (value) => {
      setPluginTop(value)
      setPluginStorageData('control', { top: value })
    },
  )

  watchPluginBlur(() => {
    control.show = control.lock
  })

  watch(
    () => control.lock,
    (value) => {
      setPluginStorageData('control', { lock: value })
    },
  )

  watch(
    () => control.theme,
    (value) => {
      document.body.dataset.theme = value
      setPluginStorageData('control', { theme: value })
    },
  )

  watchPluginLocale((value) => {
    control.locale = value
  })

  watch(
    () => control.locale,
    (value) => {
      locale.value = value
    },
  )

  watch(
    () => control.dragging,
    (value) => {
      if (value) {
        document.addEventListener('mouseup', () => (control.dragging = false))
        document.addEventListener('mousemove', movePlugin)
      } else {
        document.addEventListener('mouseup', () => (control.dragging = false))
        document.removeEventListener('mousemove', movePlugin)
      }
    },
  )

  return { control }
})
