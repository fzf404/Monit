import type { Component } from 'vue'

import type { PluginConfigFile } from '~/types/config'
import type { Locale } from '~/types/constant'

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
    '../../package/**/config.ts',
    {
      import: 'default',
      eager: true,
    },
  )

  const pluginRawPreloads = import.meta.glob<() => void>(
    '../../package/**/preload.ts',
    {
      import: 'default',
      eager: true,
    },
  )

  const pluginsRawComponents = import.meta.glob<Component>(
    '../../package/**/index.vue',
  )

  const pluginConfigs: Record<string, PluginConfigFile> = {}
  const pluginPreloads: Record<string, () => void> = {}
  const pluginComponents: Record<string, () => Promise<Component>> = {}

  for (const path in pluginRawConfigs) {
    const config = pluginRawConfigs[path]
    pluginConfigs[config.name] = config
    pluginPreloads[config.name] =
      pluginRawPreloads[path.replace('config.ts', 'preload.ts')]
    pluginComponents[config.name] =
      pluginsRawComponents[path.replace('config.ts', 'index.vue')]
  }

  return { pluginConfigs, pluginPreloads, pluginComponents }
}
