import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const useDsSource = env.VITE_USE_DS_SOURCE === '1' || mode === 'development'

  return {
    base: '/vellum-app/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        // In dev, point @seyo/vellum-ds at the source so changes hot-reload across packages.
        // Set VITE_USE_DS_SOURCE=0 to consume the published dist instead.
        ...(useDsSource
          ? { '@seyo/vellum-ds': resolve(__dirname, '../vellum-ds/src/index.ts') }
          : {}),
      },
    },
    server: {
      port: 5173,
    },
  }
})
