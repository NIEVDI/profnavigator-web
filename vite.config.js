import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/profnavigator-web/',
  build: {
    // Поддерживаем старые браузеры с ES-модулями:
    // Chrome 61+, Firefox 60+, Edge 16+, Safari 11+.
    // Internet Explorer не поддерживается.
    target: 'es2015',
    cssTarget: 'chrome61',
  },
})
