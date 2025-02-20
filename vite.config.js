import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  server:{
    port: 8080,
    host: '0.0.0.0',
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },


  // 配置@文件路劲
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
