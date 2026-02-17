import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: 'public',
  envDir: __dirname,
  plugins: [react()],
  publicDir: false,
  resolve: {
    alias: {
      '/src': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000
  },
  build: {
    outDir: '../build',
    emptyOutDir: true
  }
});
