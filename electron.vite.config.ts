import { resolve } from 'node:path'
import { defineConfig } from 'electron-vite'
import unocss from 'unocss/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    publicDir: 'public',
    resolve: {
      alias: {
        '~': resolve(),
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
          index: 'context/preload.ts',
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
    define: {
      __VUE_I18N_FULL_INSTALL__: false,
      __VUE_I18N_LEGACY_API__: false,
    },
    build: {
      outDir: 'dist/renderer',
      rollupOptions: {
        input: {
          index: resolve('app/index.html'),
        },
      },
    },
  },
})
