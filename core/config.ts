import type { PluginConfig } from '~/context/types'

const pluginConfig: Record<string, PluginConfig> = {}

const configs = import.meta.glob<PluginConfig>('../app/plugins/**/config.ts', {
  import: 'default',
  eager: true,
})

for (const path in configs) {
  const config = configs[path]
  pluginConfig[config.name] = config
}

interface UsePluginConfig {
  (): typeof pluginConfig
  (name: string): PluginConfig
}

export const usePluginConfig = ((name?: string) => {
  return name ? pluginConfig[name] : pluginConfig
}) as UsePluginConfig
