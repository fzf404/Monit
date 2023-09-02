import { watch, watchEffect } from 'vue'

import i18n from '@/configs/i18n'

import { useState } from './state'

const movePlugin = (event: MouseEvent) => {
  const [x, y] = [event.movementX, event.movementY]
  if (x != 0 || y != 0) {
    window.api.invoke('plugin-move', [x, y])
  }
}

const initWatch = (state: ReturnType<typeof useState>) => {
  watchEffect(() => {
    i18n.global.locale.value = state.locale
  })

  watchEffect(() => {
    window.api.invoke('plugin-sticky', state.sticky)
  })

  watchEffect(() => {
    window.api.invoke('plugin-theme', state.theme)
    document.documentElement.dataset.theme = state.theme
  })

  watchEffect(() => {
    document.addEventListener('mousemove', (event) => {
      state.setNavbarShow(
        state.navbar.dragging || state.navbar.sticky || event.clientY < 32
          ? true
          : false,
      )
    })
  })

  watch(
    () => state.navbar.dragging,
    (value) => {
      if (value) {
        document.addEventListener('mouseup', state.stopDrag)
        document.addEventListener('mousemove', movePlugin)
      } else {
        document.addEventListener('mouseup', state.stopDrag)
        document.removeEventListener('mousemove', movePlugin)
      }
    },
  )
}

export { initWatch }
