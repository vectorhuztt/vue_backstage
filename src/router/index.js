import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const Login = () => import('views/Login');
const Home = () => import('views/Home');
const Welcom = () => import('views/Welcom');
const Users = () => import('components/user/Users');
const Powers = () => import('components/power/Powers');

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
                path: '/power',
                component: Powers
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
