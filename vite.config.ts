import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // 👈 Importamos path para resolver la ruta

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 👈 Esto habilita el uso de @/
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});