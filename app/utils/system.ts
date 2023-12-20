export const openURL = async (url: string) => {
  await window.api?.invoke('open-url', url)
}
export const getPlatform = async () => {
  return await window.api?.invoke('get-platform')
}

export const getTheme = () => {
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'sun'
    : 'moon'
}

export const getLocale = () => {
  return navigator.language.startsWith('zh') ? 'cn' : 'en'
}
