import { resolve } from 'node:path'

import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'electron-vite'
import unocss from 'unocss/vite'

export default defineConfig({
  main: {
    publicDir: 'build',
    resolve: {
      alias: {
        '~': resolve(),
        '@': resolve('core'),
      },
    },
    build: {
      outDir: 'dist/main',
      rollupOptions: {
        input: {
          index: 'core/main.ts',
        },
      },
    },
  },
  preload: {
    build: {
      outDir: 'dist/preload',
      rollupOptions: {
        input: {
          index: 'core/contexts/preload.ts',
        },
      },
    },
  },
  renderer: {
    root: 'app',
    plugins: [vue(), unocss(), VueI18nPlugin({})],
    resolve: {
      alias: {
        '~': resolve(),
        '@': resolve('app'),
      },
    },
    build: {
      outDir: 'dist/renderer',
      rollupOptions: {
        input: {
          index: 'app/index.html',
        },
      },
    },
  },
})
