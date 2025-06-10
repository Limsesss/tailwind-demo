import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  root: '.', // корень — текущая папка client
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  base: './', // для правильных путей в билде
  server: {
    open: true, 
  },
  resolve: {
    alias: {
      
      '@': '/src',
    },
  },
})
