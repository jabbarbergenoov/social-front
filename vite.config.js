import { defineConfig } from 'vite';
import path from 'path';
import { sign } from 'crypto';

export default defineConfig({
  root: 'src', // Asosiy papka src
  build: {
    outDir: '../dist', // Qurilish natijalari dist papkasiga chiqariladi
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'), // Asosiy fayl
        sign: path.resolve(__dirname, 'src/signup.html'), // Asosiy fayl
      }
    },
    emptyOutDir: true, // dist papkasini bo'sh qilish
  },
});