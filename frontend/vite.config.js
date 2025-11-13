import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Content-Security-Policy': "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://accounts.google.com https://www.gstatic.com https://www.google.com; worker-src 'self' blob:; frame-src 'self' https://accounts.google.com https://www.google.com; connect-src 'self' https://accounts.google.com https://www.google.com http://localhost:3000 http://localhost:3001 https://utn-ds25-grupo-08-wuql.onrender.com https://*.vercel.app;",
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Asegurar que las fuentes se copien correctamente
    assetsInclude: ['**/*.woff2', '**/*.woff', '**/*.ttf', '**/*.otf'],
    rollupOptions: {
      output: {
        // Mantener estructura de carpetas para fuentes
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && /\.(woff2?|ttf|otf|eot)$/i.test(assetInfo.name)) {
            return 'fonts/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  // Asegurar que las fuentes se sirvan con el tipo MIME correcto
  publicDir: 'public'
})
