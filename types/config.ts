import type { Locale } from './constant'

export type PluginConfigFile = {
  name: string
  width: number
  height: number
  emoji: string
  description: Record<Locale, string>
}

export type PluginPreloadsFile = () => void
