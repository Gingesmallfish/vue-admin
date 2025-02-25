import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';
import { ElMessage } from 'element-plus';
import Admin from "@/views/component/Admin.vue";

const defaultRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        meta: { title: '教务管理系统登录' }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        meta: { requiresAuth: true, title: '教务管理系统' },
        children: [] // 用于动态添加子路由
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
        meta: { title: '教务管理系统注册' }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/NotFound/404.vue'),
        meta: { title: '404 页面' }
    },
];

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



// 获取并动态添加路由
const addRoutes = (routes) => {
    routes.forEach(route => {
        path: route.path,
            name
    })
}
export default router;