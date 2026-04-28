/// <reference types="vitest" />
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * GitHub Pages serves 404.html on any unknown path (with a 404 status), so we
 * emit a copy of index.html as 404.html. That makes deep links and refreshes on
 * client-side routes (/sv, /en) load the SPA shell and resolve correctly.
 */
function ghPagesSpaFallback(): Plugin {
  return {
    name: 'gh-pages-spa-fallback',
    apply: 'build',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const useDsSource = env.VITE_USE_DS_SOURCE === '1' || mode === 'development'

  return {
    base: '/vellum-app/',
    plugins: [react(), tailwindcss(), ghPagesSpaFallback()],
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
    test: {
      environment: 'jsdom',
      globals: true,
    },
  }
})
