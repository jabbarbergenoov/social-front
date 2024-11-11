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
        card: path.resolve(__dirname, 'src/card.html'), // Asosiy fayl
        login: path.resolve(__dirname, 'src/login.html'), // Asosiy fayl
        reser: path.resolve(__dirname, 'src/reser.html'), // Asosiy fayl
        reser: path.resolve(__dirname, 'src/reser.html'), // Asosiy fayl
        new_post: path.resolve(__dirname, 'src/new-post.html'), // Asosiy fayl
        request: path.resolve(__dirname, 'src/js/request.js'), // Asosiy fayl
        post: path.resolve(__dirname, 'src/post.html'), // Asosiy fayl
        post: path.resolve(__dirname, 'src/search.html'), // Asosiy fayl
        post: path.resolve(__dirname, 'src/js/search.js'), // Asosiy fayl
      }
    },
    emptyOutDir: true, // dist papkasini bo'sh qilish
  },
});