import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],

    // 压缩代码
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }
    },

    // 配置代理
    server: {
        port: 8080,
        host: '0.0.0.0',
        open: true,
    },


    // 配置@文件路劲
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
})
