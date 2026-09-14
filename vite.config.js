import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/profnavigator-web/',
})

build: {
  target: 'es2015',              // Chrome 51+, Safari 10+, Firefox 54+, Edge 15+
  cssTarget: 'chrome61',         // Современные CSS-функции с фоллбэками
  polyfillDynamicImport: true,   // Поддержка динамических импортов
}
