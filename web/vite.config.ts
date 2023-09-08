import dns from 'dns'
import path from 'path'

import { defineConfig, UserConfig } from 'vite'

// See: https://vitejs.dev/config/server-options.html#server-host
// So that Vite will load on local instead of 127.0.0.1
dns.setDefaultResultOrder('verbatim')

import redwood from '@redwoodjs/vite'

const isProd = process.env.NODE_ENV === 'production'

const viteConfig: UserConfig = {
  plugins: [redwood()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    https: isProd
      ? undefined
      : {
          key: '../certs/key.pem',
          cert: '../certs/cert.pem',
        },
  },
}

export default defineConfig(viteConfig)
