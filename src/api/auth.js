import http from '../axios.js';

/**
 * 登录请求
 * @param data 登录信息
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const login = (data) => {
    return http.post('/api/user/login', data);
};

/**
 *  注册信息
 * @param data 注册信息
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const register = (data) => {
    return http.post('/api/user/registerAPI', data);
};

/**
 * 获取验证码
 * @returns {Promise<axios.AxiosResponse<any>>}
 */

export const getCaptcha = () => {
    return http.get('/api/user/captcha', {
        responseType: 'arraybuffer' // 设置响应类型为二进制数据
    });
};

