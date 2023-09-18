import type { PluginOptions } from '~/context/interface'

export const initWatch = ({ window, storage }: PluginOptions) => {
  window.on('move', () => {
    const [x, y] = window.getPosition()
    storage.set('config', { x, y })
  })
  window.on('resize', () => {
    const [width, height] = window.getSize()
    storage.set('config', { width, height })
  })
  window.on('blur', () => {
    window.webContents.send('set-plugin-navbar', false)
  })
}
