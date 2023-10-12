import type { UnwrapNestedRefs } from 'vue'
import { reactive, watch } from 'vue'

type Storage = Record<string, any>

export const useStorage = async <T extends Storage>(
  store: T,
): Promise<UnwrapNestedRefs<T>> => {
  const data = await window.api?.invoke('get-plugin-data', 'storage')

  for (const key in store) {
    if (data && data[key] !== undefined) {
      store[key] = data[key]
    }
  }

  const storage = reactive(store)

  watch(storage, (data) => {
    window.api?.invoke('set-plugin-data', 'storage', { ...data })
  })

  return storage
}
