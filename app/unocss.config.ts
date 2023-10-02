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
    // color
    'bg-base': 'sun:bg-blue moon:bg-purple-600',
    'text-primary': 'sun:text-white moon:text-gray-200',
    'text-secondary': 'sun:text-gray-100 moon:text-gray-300',
    'text-info': 'sun:text-gray-200 moon:text-gray-400',
    // flex layout
    'flex-row-center': 'flex flex-row justify-center',
    'flex-row-between': 'flex flex-row justify-between',
    'flex-row-left': 'flex flex-row justify-start',
    'flex-row-right': 'flex flex-row justify-end',
    'flex-col-center': 'flex flex-col items-center justify-center',
    // semantic tag
    nav: 'flex-row-between absolute w-full',
    modal:
      'absolute h-full w-full flex-col-center sun:bg-gray-600 moon:bg-gray-900 sun:bg-opacity-20 moon:bg-opacity-40',
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
