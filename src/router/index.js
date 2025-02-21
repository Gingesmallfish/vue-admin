// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';
import { ElMessage } from 'element-plus';
import { getMenus } from '@/api/menusApi';
import Admin from "@/views/component/Admin.vue"; // 引入获取菜单数据的接口

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

// 扁平化菜单树
function flattenMenus(menus) {
  let flatMenus = [];
  menus.forEach(menu => {
    flatMenus.push(menu);
    if (menu.children && menu.children.length > 0) {
      flatMenus = flatMenus.concat(flattenMenus(menu.children));
    }
  });
  return flatMenus;
}

// 动态添加路由
let isDynamicRoutesAdded = false;
const addDynamicRoutes = async () => {
  try {
    const response = await getMenus();
    console.log('Response:', response); // 添加调试信息
    console.log('Response Data:', response.data); // 添加调试信息

    if (!response.data) {
      throw new Error('Response data is undefined or null');
    }

    const menus = response.data;
    const dynamicRoutes = flattenMenus(menus)
        .filter(menu => menu.path) // 过滤掉 path 为 null 的记录
        .map(menu => ({
          path: menu.path,
          name: menu.name,
          component: () => import(`@/views/${menu.component}.vue`),
          meta: { title: menu.name }
        }));
    dynamicRoutes.forEach(route => {
      router.addRoute('Admin', route);
    });
    isDynamicRoutesAdded = true;
  } catch (error) {
    console.error('获取菜单数据失败:', error);
  }
}

// 路由守卫
router.beforeEach(async (to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || '教务管理系统';

  // 动态添加路由
  if (!isDynamicRoutesAdded) {
    await addDynamicRoutes();
    next({ ...to, replace: true });
    return;
  }

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

export default router;
