interface plugin {
  icon: string
  name: string
  size: number[]
  description: string
  debug?: boolean
}

export const pluginList: plugin[] = [
  { icon: '👏', name: 'guide', size: [2, 2], description: '欢迎' },
]
