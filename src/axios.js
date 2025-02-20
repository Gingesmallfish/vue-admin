import axios from 'axios';
import store from '@/store';
import router from "@/router/index.js";

const http = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 确保携带 Cookie
});

// 请求拦截器
http.interceptors.request.use(
    (config) => {
        const token = store.getters.isAuthenticated ? store.state.token : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            store.dispatch('logout');
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

export default http;