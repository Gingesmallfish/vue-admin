import axios from '@/axios'

// 退出登录
export const logoutApi = (id) => {
    return axios.get('/api/user/logout', id);
};


// 获取用户信息接口
export const getUserInfo = (userId) => {
    return axios.get(`/api/user/${userId}`);
};

// 更新用户简介接口
export const updateUserIntroduction = (userId, introduction) => {
    return axios.post(`/api/user/${userId}/introduction`, { introduction });
};

// 上传用户头像接口
export const uploadUserAvatar = (userId, formData) => {
    return axios.post(`/api/user/${userId}/avatar`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};