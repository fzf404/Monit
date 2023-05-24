import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import Vue from '@vitejs/plugin-vue'
import commonjsExternals from 'vite-plugin-commonjs-externals'
import builtinModules from 'builtin-modules'

const alias = {
  '~': resolve(__dirname),
  '@': resolve(__dirname, 'app')
}

const commonjsPackages = [
  'electron',
  'electron/main',
  'electron/common',
  'electron/renderer',
  'original-fs',
  ...builtinModules
  // ...Object.keys(pkg.dependencies).map((name) => new RegExp('^' + escapeRegExp(name) + '(\\/.+)?$'))
]

export default defineConfig({
  main: {
    resolve: {
      alias
    },
    build: {
      lib: {
        entry: 'core/main.ts'
      }
    },
    define: {
      __static: '""'
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    root: 'app',
    build: {
      lib: {
        entry: 'app/index.html'
      },
      rollupOptions: {
        input: ['app/index.html']
      }
    },

    resolve: {
      alias
    },
    plugins: [Vue(), commonjsExternals({ externals: commonjsPackages })],
    optimizeDeps: {
      exclude: commonjsPackages
    }
  }
})
