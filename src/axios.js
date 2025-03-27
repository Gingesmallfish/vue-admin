import axios from 'axios';
import store from './store/index.js';
import router from "./router/index.js";
import {ElMessage} from "element-plus";

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
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {

        return Promise.reject(error);
    }
);

// 响应拦截器
http.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response?.status === 401) {
        ElMessage.error('登录已过期，请重新登录');
        store.commit('logout'); // 清空登录状态
        router.push('/login'); // 跳转到登录页
    }
    return Promise.reject(error);
});


export default http;
