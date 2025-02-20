import axios from '@/axios'

// 退出登录
export const logoutApi = (id) => {
    return axios.get('/api/user/logout', id);
};


/**
 * 获取头像
 * @param userId
 * @returns {Promise<*|string>}
 */

