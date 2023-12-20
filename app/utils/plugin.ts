import type { Component } from 'vue'

import type { Locale, PluginConfigFile } from '~/context/types'

export const closePlugin = async () => {
  await window.api?.invoke('set-plugin-close')
}

export const minimizePlugin = async () => {
  await window.api?.invoke('set-plugin-minimize')
}

export const refreshPlugin = async () => {
  await window.api?.invoke('refresh-plugin')
}

export const setPluginTop = async (value: boolean) => {
  await window.api?.invoke('set-plugin-sticky', value)
}

export const watchPluginLocale = (callback: (value: Locale) => void) => {
  window.api?.on('set-plugin-locale', (_, value) => {
    callback(value)
  })
}

export const watchPluginBlur = (callback: () => void) => {
  window.api?.on('set-plugin-blur', () => {
    callback()
  })
}

export const movePlugin = (event: MouseEvent) => {
  const [x, y] = [event.movementX, event.movementY]
  if (x != 0 || y != 0) {
    window.api?.invoke('set-plugin-position', [x, y])
  }
}

export const getPluginSource = () => {
  const pluginRawConfigs = import.meta.glob<PluginConfigFile>(
    '../plugins/**/config.ts',
    {
      import: 'default',
      eager: true,
    },
  )

  const pluginsRawComponents = import.meta.glob<Component>(
    '../plugins/**/*.vue',
  )

  const pluginConfigs: Record<string, PluginConfigFile> = {}
  const pluginComponents: Record<string, () => Promise<Component>> = {}

  for (const path in pluginRawConfigs) {
    const config = pluginRawConfigs[path]
    pluginConfigs[config.name] = config
    pluginComponents[config.name] =
      pluginsRawComponents[path.replace('config.ts', config.main)]
  }

  return { pluginConfigs, pluginComponents }
}
