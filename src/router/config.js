export default [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        meta: {title: '教务管理系统登录'}
    },

    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
        meta: {title: '教务管理系统注册'}
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/Layouts/admin.vue'), // 确保路径正确
        meta: {requiresAuth: true, title: '教务管理系统'},
        children: []
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/NotFound/404.vue'),
        meta: {title: '404 页面'}
    },
];
