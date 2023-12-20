import { defineStore } from 'pinia'
import { reactive } from 'vue'

import { initControl } from './control'

export const useLayout = defineStore('layout', () => {
  const layout = reactive({
    control: false,
    setting: false,
  })

  initControl(layout)

  return { layout }
})
