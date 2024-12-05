import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type ServerOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    historyApiFallback: true,
  } as ServerOptions,
})