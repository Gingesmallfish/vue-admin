// src/router/config.js
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
        component: () => import('@/component/admin.vue'), // 确保路径正确
        meta: {requiresAuth: true, title: '教务管理系统'},
        children: [
            {
                path: '', // 默认子路由
                name: 'AdminHome',
                component: () => import('@/component/admin-home.vue'), // 添加一个默认子路由组件
                meta: {requiresAuth: true, title: '教务管理系统首页'}
            },
            // 日志管理
            {
                path: '/log-management', // 相对路径
                name: 'LogManagement',
                component: () => import('@/component/log-management.vue'),

                meta: {requiresAuth: true, title: '日志管理'}
            },
            // 用户管理
            {
                path: '/user-management',
                name: 'UserManagement',
                component: () => import('@/component/user-management/index.vue'),
                meta: {requiresAuth: true, title: '用户管理'},
                children: [
                    {
                        path: 'permissions',
                        name: 'UserPermissions',
                        component: () => import('@/component/user-management/permissions.vue'),
                        meta: {requiresAuth: true, title: '用户权限'}
                    }
                ]
            }
        ]
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/NotFound/404.vue'),
        meta: {title: '404 页面'}
    },
];
