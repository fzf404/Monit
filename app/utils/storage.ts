import type { PluginStorageFile } from '~/context/types'

export const getPluginStorageData = async <T extends keyof PluginStorageFile>(
  key: T,
) => {
  return (await window.api?.invoke(
    'get-plugin-storage-data',
    key,
  )) as PluginStorageFile[T]
}

export const setPluginStorageData = async <T extends keyof PluginStorageFile>(
  key: T,
  data: PluginStorageFile[T],
) => {
  await window.api?.invoke('set-plugin-storage-data', key, { ...data })
}
