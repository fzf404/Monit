import type { PluginConfig } from '~/context/interface'

const configs: Record<string, PluginConfig> = {}

export const initConfig = () => {
  const plugins = import.meta.glob('../app/plugins/**/config.ts', {
    import: 'default',
    eager: true,
  })
  for (const path in plugins) {
    const config = plugins[path] as PluginConfig
    configs[config.name] = config
  }
}

export const getAllPluginConfigs = () => {
  return configs
}
export const getPluginConfig = (name: string) => {
  return configs[name]
}
