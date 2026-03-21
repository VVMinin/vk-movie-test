import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

const repositoryName = 'vk-movie-test'
const basePath = process.env.GITHUB_ACTIONS ? `/${repositoryName}/` : '/'

// https://vite.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
