import http from '../axios.js'

/**
 * 推出功能
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const logoutApi = (id) => {
    return http.get('/api/user/logout', id);
};


/**
 *  获取用户信息
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getUserInfoApi = () => {
    return http.get(`/api/user/info`);
};