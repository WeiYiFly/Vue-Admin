import Layout from '@/views/layout.vue'
import login from '@/views/login.vue'
import Home from '@/views/Home.vue'
import name1 from '@/views/name1.vue'
import name2 from '@/views/name2.vue'
import table1 from '@/views/table1.vue'
import table2 from '@/views/table2.vue'
import Modoule from '@/views/system/Modoule.vue'
import User from '@/views/system/User.vue'
import Role from '@/views/system/Role.vue'
import FormGroup from '@/views/Form-group.vue'
export default [
  {
    path: '/layout',
    component: Layout,
    children: [
      {
        path: 'home_index',
        name: 'home_index',
        meta: {
          title: '首页'
        },
        component: Home
      },
      {
        path: 'name1',
        name: 'name11111name11111111name11111111111',
        component: name2
      },
      {
        path: 'name2',
        name: 'name2',
        component: name2
      },
      {
        path: 'table1',
        name: 'table1',
        component: table1
      },
      {
        path: 'table2',
        name: 'table2',
        component: table2
      },
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          title: '参数'
        },
        component: () => import('@/views/params.vue'),
        props: true
      }
    ]
  },
  {
    path: '/System',
    name: 'system',
    component: Layout,
    children: [
      {
        path: 'modoule',
        name: 'system-modoule',
        component: Modoule
      },
      {
        path: 'user',
        name: 'system-user',
        component: User
      },
      {
        path: 'role',
        name: 'system-role',
        component: Role
      }
    ]
  },
  {
    path: '/name1',
    name: 'name111',
    component: Layout,
    children: [{
      path: '/name1',
      name: 'name1',
      component: name1
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },

  {
    path: '/Home',
    name: 'home',
    component: Layout
  },
  {
    path: '/',
    component: Layout
  },
  {
    path: '/Form',
    component: FormGroup
  }
]
