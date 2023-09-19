import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  shortcuts: {
    'flex-row-center': 'flex flex-row justify-center',
    'flex-row-between': 'flex flex-row justify-between',
    'flex-row-left': 'flex flex-row justify-start',
    'flex-row-right': 'flex flex-row justify-end',
    'flex-col-center': 'flex flex-col items-center justify-center',
    nav: 'flex-row-between absolute w-full',
    dialog:
      'absolute h-full w-full flex-col-center moon:bg-gray-900 sun:bg-gray-600 moon:bg-opacity-50 sun:bg-opacity-30',
    menu: 'dialog',
  },
  variants: [
    (matcher) => {
      if (matcher.startsWith('sun:')) {
        return {
          matcher: matcher.slice(4),
          selector: (s) => `[data-theme='light'] ${s}`,
        }
      }
      if (matcher.startsWith('moon:')) {
        return {
          matcher: matcher.slice(5),
          selector: (s) => `[data-theme='dark'] ${s}`,
        }
      }
      if (matcher.startsWith('punk:')) {
        return {
          matcher: matcher.slice(5),
          selector: (s) => `[data-theme='punk'] ${s}`,
        }
      }
      return matcher
    },
  ],
  transformers: [transformerDirectives()],
})
