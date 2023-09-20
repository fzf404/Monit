import type { PluginOptions } from '~/context/interface'

import { getPluginStorage } from './global'

export const initWatch = ({ name, window }: PluginOptions) => {
  window.on('move', () => {
    // save window position
    const [x, y] = window.getPosition()
    getPluginStorage(name).set('config', { x, y })
  })
  window.on('blur', () => {
    // hide navbar when window blur
    window.webContents.send('set-plugin-navbar', false)
  })
}
