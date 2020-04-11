import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const Login = () => import('components/Login');
const Home = () => import('components/Home');
const Welcom = () => import('components/Welcom');
const Users = () => import('components/user/Users');
const Perimission = ()=> import('components/permission/Perimission')
const routes = [
    {
        path: '',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        redirect: '/welcom',
        children: [
            {
                path: '/welcom',
                component: Welcom
            },
            {
                path: '/users',
                component: Users
            },
            {
                path: '/access',
                component: Perimission
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

// 拦截路由导航守卫
router.beforeEach((to, from, next) => {
    // to: 目的地址
    // from: 源地址
    // next: 放行方法
    if (to.path === '/login') return next();
    const tokenStr = window.sessionStorage.getItem('token');
    if (!tokenStr) {
        return next('/login');
    } else {
        next();
    }
});

export default router;
