import Layout from '@/views/layout.vue'
import login from '@/views/login.vue'
import Home from '@/views/Home.vue'
export default [
  {
    path: '/layout',
    component: Layout
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/Home',
    component: Home
  },
  {
    path: '/',
    component: Layout
  }
]
