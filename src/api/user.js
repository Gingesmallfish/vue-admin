import http from '@/axios'

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
export const getUserInfoApi = (id) => {
    return http.get(`/avatar/user/${id}`);
};