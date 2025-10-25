import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Content-Security-Policy': "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://www.gstatic.com; frame-src 'self' https://accounts.google.com; connect-src 'self' https://accounts.google.com http://localhost:3000 http://localhost:3001;"
    }
  }
})
