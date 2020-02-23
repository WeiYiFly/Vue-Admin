import Layout from '@/views/layout.vue'
import login from '@/views/login.vue'
import Home from '@/views/Home.vue'
import system from './system'
import error from '@/views/error.vue'
export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页'
        },
        component: Home
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: login
  },
  {
    path: '/error',
    name: 'error',
    meta: {
      title: '404'
    },
    component: error
  },
  {
    path: '*',
    name: '*',
    redirect: to => error
  },
  ...system

]
