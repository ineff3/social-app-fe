import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    visualizer({
      template: 'treemap',
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'analyze.html',
    }) as PluginOption,
    react(),
    tsconfigPaths(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          rhf: ['react-hook-form'],
          zod: ['zod'],
        },
      },
    },
  },
})
