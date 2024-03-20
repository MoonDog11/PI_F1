import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://pif1-production.up.railway.app/drivers', // Cambia esto por la URL de tu backend en Railway
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '') // Elimina el prefijo /api de las solicitudes
      }
    }
  }
});
