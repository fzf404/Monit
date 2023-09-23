import type { PluginOptions } from '~/context/interface'

import { getPluginStorage } from './storage'

export const initWatch = ({ name, window }: PluginOptions) => {
  window.on('move', () => {
    const [x, y] = window.getPosition()
    getPluginStorage(name).set('control', { x, y })
  })
  window.on('blur', () => {
    window.webContents.send('set-plugin-navbar', false)
  })
}
