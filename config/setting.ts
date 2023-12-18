export const baseStore: PluginStore = {
  titlebarType: 'show'
}

export const baseSetting: PluginSetting[] = [
  {
    id: 'titlebarType',
    label: '标题栏',
    type: 'select',
    options: [
      {
        label: '显示',
        value: 'show'
      },
      {
        label: '自动隐藏',
        value: 'auto'
      }
    ]
  }
]

export type PluginSetting =
  | {
      id: string
      label: string
      type: 'text' | 'checkbox'
      help?: string
    }
  | {
      id: string
      label: string
      type: 'number'
      help?: string
      options: { len: number }
    }
  | {
      id: string
      label: string
      type: 'select'
      help?: string
      options: { label: string; value: string }[]
    }
  | {
      id: string
      label: string
      type: 'button'
      help?: string
      options: { text: string; click: () => void }
    }

interface PluginStore {
  [key: string]: any // 假设这里是 baseStore 的类型定义
}
