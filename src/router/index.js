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
  console.log(token)
  if (token) {
    store.dispatch('authorization', token).then(() => {
      console.log('denv1')
      if (to.name === 'login') next({ name: 'home' })
      else next()
    }).catch(() => {
      setToken('') // 清空字符串
      next({ name: 'login' })
    })
  } else {
    console.log('11')
    console.log(to.name)
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
export default router
