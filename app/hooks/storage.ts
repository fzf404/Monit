import type { UnwrapNestedRefs } from 'vue'
import { reactive, watch } from 'vue'

type Storage = Record<string, any>

export const useStorage = <T extends Storage>(data: T): UnwrapNestedRefs<T> => {
  const storage = reactive(data)

  watch(
    () => storage,
    () => {
      window.api?.invoke('set-plugin-data', 'storage', storage)
    },
  )

  return storage
}
