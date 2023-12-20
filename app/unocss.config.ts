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
    // theme color
    'bg-theme': 'sun:bg-blue-500 moon:bg-purple-600',
    'bg-color': 'sun:bg-gray-200 moon:bg-gray-800 ',
    'bg-reverse': 'sun:bg-purple-500 moon:bg-blue-600',
    'bg-danger': 'sun:bg-red-500 moon:bg-red-600',
    'bg-success': 'sun:bg-green-500 moon:bg-green-600',
    'bg-warning': 'sun:bg-yellow-500 moon:bg-yellow-600',
    'bg-info': 'sun:bg-blue-500 moon:bg-blue-600',
    'text-theme': 'sun:text-blue-500 moon:text-purple-500',
    'text-primary': 'sun:text-white moon:text-gray-200',
    'text-secondary': 'sun:text-gray-100 moon:text-gray-300',
    'text-info': 'sun:text-gray-200 moon:text-gray-400',
    'accent-theme': 'sun:accent-blue-500 moon:accent-purple-600',
    // flex layout
    'flex-row-center': 'flex flex-row justify-center',
    'flex-row-between': 'flex flex-row justify-between items-center',
    'flex-row-left': 'flex flex-row justify-start',
    'flex-row-right': 'flex flex-row justify-end',
    'flex-col-center': 'flex flex-col items-center justify-center',
    // semantic tag
    screen: 'absolute h-full w-full',
    modal: 'screen flex-col-center sun:bg-gray-600/20 moon:bg-gray-900/40',
    // style class
    box: 'shadow rounded border-none outline-none opacity-80 hover:opacity-100',
    'box-sm': 'box px-1.5 py-0.5 text-xs',
    'box-md': 'box px-2 py-1 text-xs',
    'box-lg': 'box px-2 py-1',
    'box-sq': 'box p-1',
  },
  variants: [
    (matcher) => {
      if (matcher.startsWith('sun:')) {
        return {
          matcher: matcher.slice(4),
          selector: (s) => `[data-theme='sun'] ${s}`,
        }
      }
      if (matcher.startsWith('moon:')) {
        return {
          matcher: matcher.slice(5),
          selector: (s) => `[data-theme='moon'] ${s}`,
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
