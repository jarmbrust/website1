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
  server: {
    port: 3000,
    historyApiFallback: true,
  } as ServerOptions,
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
})
