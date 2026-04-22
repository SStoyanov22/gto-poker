import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/gto-poker/',  // GitHub repo name for GitHub Pages
})
