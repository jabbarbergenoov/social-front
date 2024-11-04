import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'src', // Asosiy papka src
  build: {
    outDir: '../dist', // Qurilish natijalari dist papkasiga chiqariladi
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'), // Asosiy fayl
      }
    },
    emptyOutDir: true, // dist papkasini bo'sh qilish
  },
});