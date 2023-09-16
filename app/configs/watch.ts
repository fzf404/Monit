import { watch, watchEffect } from 'vue'

import i18n from '@/configs/locale'

import type { State } from './interface'

const movePlugin = (event: MouseEvent) => {
  const [x, y] = [event.movementX, event.movementY]
  if (x != 0 || y != 0) {
    window.api?.invoke('set-plugin-position', [x, y])
  }
}

export const setWatch = (state: State) => {
  watchEffect(() => {
    i18n.global.locale.value = state.locale
  })

  watchEffect(() => {
    window.api?.invoke('set-plugin-sticky', state.sticky)
  })

  watchEffect(() => {
    window.api?.invoke('set-plugin-theme', state.theme)
    document.body.setAttribute('class', state.theme)
  })

  watchEffect(() => {
    document.addEventListener('mousemove', (event) => {
      state.navbar.show =
        state.navbar.dragging || state.navbar.sticky || event.clientY < 32
          ? true
          : false
    })
  })

  watch(
    () => state.navbar.dragging,
    (value) => {
      if (value) {
        document.addEventListener(
          'mouseup',
          () => (state.navbar.dragging = false),
        )
        document.addEventListener('mousemove', movePlugin)
      } else {
        document.addEventListener(
          'mouseup',
          () => (state.navbar.dragging = false),
        )
        document.removeEventListener('mousemove', movePlugin)
      }
    },
  )
}
