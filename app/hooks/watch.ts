import { watch } from 'vue'

import { i18n } from '@/configs/i18n'

import type { State } from './interface'

const movePlugin = (event: MouseEvent) => {
  const [x, y] = [event.movementX, event.movementY]
  if (x != 0 || y != 0) {
    window.api?.invoke('set-plugin-position', [x, y])
  }
}

const setEvent = (state: State) => {
  window.api?.on('set-plugin-locale', (_, value) => {
    state.locale = value
  })
  window.api?.on('set-plugin-navbar', (_, value) => {
    state.navbar.show = value
  })
}

const setPlugin = async (state: State) => {
  document.body.dataset.theme = state.theme
  document.body.dataset.platform = await window.api?.invoke('get-platform')
  document.addEventListener('mousemove', (event) => {
    state.navbar.show =
      state.navbar.dragging || event.clientY < 32 ? true : false
  })
}

export const setWatch = (state: State) => {
  setEvent(state)
  setPlugin(state)

  watch(
    () => state.locale,
    (value) => {
      i18n.global.locale.value = value
    },
  )

  watch(
    () => state.sticky,
    (value) => {
      window.api?.invoke('set-plugin-sticky', value)
      window.api?.invoke('set-plugin-data', 'control', { sticky: value })
    },
  )

  watch(
    () => state.theme,
    (value) => {
      document.body.dataset.theme = value
      window.api?.invoke('set-plugin-theme', value)
      window.api?.invoke('set-plugin-data', 'control', { theme: value })
    },
  )

  watch(
    () => state.navbar.sticky,
    (value) => {
      window.api?.invoke('set-plugin-data', 'control', { navbar: value })
    },
  )

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
