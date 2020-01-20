import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import routes from './router'
import { setTitle, setToken, getToken } from '@/lib/util'
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history', // history
  routes
})

// const HAS_LOGINED = false // 有没有登录

router.beforeEach((to, from, next) => {
  to.meta && setTitle(to.meta.title)
  const token = getToken()
  // console.log('路由拦截')
  if (token) {
    store.dispatch('authorization', token).then(() => {
      if (to.name === 'login') next({ name: 'home' })
      // else next()
      else {
        store.dispatch('JudgeRoutername', to.name).then(() => {
          next()
        }).catch(() => {
          next({ name: 'error' })
        })
      }
    }).catch(() => {
      setToken('') // 清空字符串
      next({ name: 'login' })
    })
  } else {
    if (to.name === 'login') next() //
    else next({ name: 'login' })
  }
})

// 页面在跳转路由控制台会报Uncaught (in promise)的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// 页面在跳转路由控制台会报Uncaught (in promise)的问题 End

/**
 * 1. 导航被触发
 * 2. 在失活的组件（即将离开的页面组件）里调用离开守卫 beforeRouteLeave
 * 3. 调用全局的前置守卫 beforeEach
 * 4. 在重用的组件里调用 beforeRouteUpdate
 * 5. 调用路由独享的守卫 beforeEnter
 * 6. 解析异步路由组件
 * 7. 在被激活的组件（即将进入的页面组件）里调用 beforeRouteEnter
 * 8. 调用全局的解析守卫 beforeResolve
 * 9. 导航被确认
 * 10. 调用全局的后置守卫 afterEach
 * 11. 触发DOM更新
 * 12. 用创建好的实例调用beforeRouterEnter守卫里传给next的回调函数
 */

export default router
