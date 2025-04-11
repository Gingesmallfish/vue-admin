import { createRouter, createWebHashHistory } from 'vue-router';
import store from '../store/index.js';
import { ElMessage } from 'element-plus';
import adminRoutes from './adminRoutes.js';

// 公共路由
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/Login.vue'),
            meta: { title: '教务管理系统登录' }
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/views/Register.vue'),
            meta: { title: '教务管理系统注册' }
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('@/Layouts/admin.vue'),
            meta: { requiresAuth: true, title: '教务管理系统' },
            children: adminRoutes
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('@/NotFound/404.vue'),
            meta: { title: '404 页面' }
        },
    ]
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
        next('/admin'); // 登陆成功过后跳转到admin
    } else {
        next();
    }
});

export default router;
