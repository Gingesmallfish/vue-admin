import axios from "@/api/axios";

// 获取后端菜单
export const getMenus = async () => {
    try {
        const res = await axios.get("/api/menus/tree");
        return res.data
    } catch (error) {
        console.log("获取菜单数据失败",error);
        return []
    }
};
