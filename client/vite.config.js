import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Pisahkan chunk untuk node_modules
          if (id.includes('node_modules')) {
            return 'vendor'; // Memindahkan semua dependensi dari node_modules ke dalam satu chunk
          }
          // Tambahkan chunking untuk komponen besar jika diperlukan
          if (id.includes('src/components')) {
            return 'components'; // Pisahkan komponen besar dalam chunk terpisah
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Atur limit ukuran chunk yang lebih besar untuk menghindari peringatan
  }
})
