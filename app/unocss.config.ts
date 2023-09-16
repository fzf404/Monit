import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: {
    'flex-row-center': 'flex flex-row justify-center',
    'flex-row-between': 'flex flex-row justify-between',
    'flex-col-center': 'flex flex-col items-center justify-center',
    nav: 'flex-row-between absolute w-full',
    dialog:
      'flex-col-center absolute h-full w-full bg-gray-600 bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-50',
    menu: 'dialog',
  },
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [transformerDirectives()],
})
