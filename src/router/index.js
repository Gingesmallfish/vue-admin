import {createRouter, createWebHashHistory} from 'vue-router';
import store from '../store/index.js';
import {ElMessage} from 'element-plus';
import defaultRoutes from './config.js';

// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes: defaultRoutes
});

// 路由守卫
router.beforeEach(async (to, from, next) => {
    // 设置页面标题
    document.title = to.meta.title || '教务管理系统';

    // 权限验证
    if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
        ElMessage.error('您还没有权限，请登录后访问');
        next('/login');
    } else if (store.getters.isLoggedIn && to.path === '/login') {
        next('/admin'); // 这里假设登录后默认跳转到 /admin
    } else {
        next();
    }
});

// 动态添加路由的方法
export function addRoutes(routes) {
    try {
        routes.forEach(route => {
            if (!router.hasRoute(route.name)) {
                router.addRoute('admin', route);
            }
        });
    } catch (error) {
        console.error('动态添加路由失败:', error);
        throw error;
    }
}

export default router;
