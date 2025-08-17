import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3011,
    proxy: {
      '/trpc': {
        target: 'http://localhost:3010',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:3010',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
});