import path from 'path'
import { cpSync, existsSync, mkdirSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { inspectAttr } from 'kimi-plugin-inspect-react'

function photoAssetsPlugin(): Plugin {
  const photoDir = path.resolve(__dirname, 'photo')
  const publicPhotoDir = path.resolve(__dirname, 'public/photo')

  const syncPhotos = () => {
    if (!existsSync(photoDir)) return
    mkdirSync(path.resolve(__dirname, 'public'), { recursive: true })
    cpSync(photoDir, publicPhotoDir, { recursive: true })
  }

  return {
    name: 'photo-assets',
    configureServer() {
      syncPhotos()
    },
    buildStart() {
      syncPhotos()
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [photoAssetsPlugin(), inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
