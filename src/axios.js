import axios from 'axios';
import store from '@/store';
import router from "@/router/index.js";

const http = axios.create({
    baseURL: 'http://localhost:3000', // 与 Vite 代理配置匹配
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 确保携带 Cookie
    timeout: 10000 // 设置超时时间为 10 秒
});

// 请求拦截器
http.interceptors.request.use(
    (config) => {
        const token = store.getters.isLoggedIn ? store.state.token : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('请求配置:', config);
        return config;
    },
    (error) => {
        console.error('请求拦截器错误:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    store.dispatch('logout');
                    router.push('/login');
                    break;
                case 404:
                    console.error('请求的资源未找到',);
                    break;
                case 500:
                    console.error('服务器内部错误');
                    break;
                default:
                    console.error(`未知错误，状态码: ${error.response.status}`);
            }
        } else if (error.request) {
            console.error('请求已发送，但没有收到响应');
        } else {
            console.error('请求设置时发生错误', error.message);
        }
        console.error('响应拦截器错误:', error);
        return Promise.reject(error);
    }
);

export default http;
