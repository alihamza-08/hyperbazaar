import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,       // <- This makes the dev server accessible externally
    port: 5173        // <- This should match the internal port Docker uses
  }
})
