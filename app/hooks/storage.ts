import { reactive, watch } from 'vue'

import { getPluginStorageData, setPluginStorageData } from '@/utils/storage'
import type { PluginUserData } from '~/context/types'

const data = await getPluginStorageData('data')

export const useStorage = <T extends PluginUserData>(value: T) => {
  const state = reactive<T>({
    ...value,
    ...data,
  })

  watch(state, async () => {
    await setPluginStorageData('data', state)
  })

  return state
}
