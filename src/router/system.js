import Layout from '@/views/layout.vue'
import Modoule from '@/views/system/Modoule.vue'
import User from '@/views/system/User.vue'
import Role from '@/views/system/Role.vue'

export default [
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
  }
]
