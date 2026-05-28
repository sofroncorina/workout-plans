import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Base path for GitHub Pages — change 'workout-plans' to your repo name
  base: '/workout-plans/',
  build: {
    // Output to /docs so GitHub Pages can serve from that folder
    outDir: 'docs',
  },
})
