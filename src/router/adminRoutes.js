export default [
    {
        path: '',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: {
            title: '首页', requiresAuth: true,
        }
    },
    {
        path: '/log-management',
        name: 'LogManagement',
        component: () => import('@/views/log-management/LogManagement.vue'),
        meta: {
            title: '日志管理'
        }
    },
    {
        path: '/user-management',
        name: 'UserManagement',
        meta: {
            title: '用户管理'
        },
        children: [
            {
                path: 'permissions',
                name: 'UserPermissions',
                component: () => import('@/views/user-management/UserPermissions.vue'),
                meta: {
                    title: '用户权限'
                }
            }
        ]
    },
    {
        path: '/tutorial-management',
        name: 'TutorialManagement',
        meta: {
            title: '教程管理'
        },
        children: [
            {
                path: 'materials',
                name: 'TutorialMaterials',
                component: () => import('@/views/tutorial-management/TutorialMaterials.vue'),
                meta: {
                    title: '教程材料'
                }
            },
            {
                path: 'tasks',
                name: 'TutorialTasks',
                component: () => import('@/views/tutorial-management/TutorialTasks.vue'),
                meta: {
                    title: '教学任务'
                }
            },
            {
                path: 'courses',
                name: 'CourseManagement',
                component: () => import('@/views/tutorial-management/CourseManagement.vue'),
                meta: {
                    title: '课程管理'
                }
            }
        ]
    },
    {
        path: '/lab-management',
        name: 'LabManagement',
        meta: {
            title: '实验室管理'
        },
        children: [
            {
                path: 'reservations',
                name: 'LabReservations',
                component: () => import('@/views/lab-management/LabReservations.vue'),
                meta: {
                    title: '实验预约'
                }
            }
        ]
    },
    {
        path: '/teacher-management',
        name: 'TeacherManagement',
        meta: {
            title: '教师管理'
        },
        children: [
            {
                path: 'grades',
                name: 'TeacherGrades',
                component: () => import('@/views/teacher-management/TeacherGrades.vue'),
                meta: {
                    title: '成绩管理'
                }
            },
            {
                path: 'exams',
                name: 'TeacherExams',
                component: () => import('@/views/teacher-management/TeacherExams.vue'),
                meta: {
                    title: '考试管理'
                }
            }
        ]
    },
];