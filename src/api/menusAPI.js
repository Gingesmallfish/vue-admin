import axios from "@/axios.js";

export const getMenus = async () => {
    try {
        const res = await axios.get('/api/menus/Tree'); // 确保路径正确
        return res;
    } catch (error) {
        console.error('获取菜单数据失败:', error);
        throw error;
    }
};