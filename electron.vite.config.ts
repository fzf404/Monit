import { resolve } from 'node:path'
import { defineConfig } from 'electron-vite'
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
    plugins: [vue()],
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
          index: resolve('app/index.html'),
        },
      },
    },
  },
})
