import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import routes from './router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history', // history
  routes
})

// 页面在跳转路由控制台会报Uncaught (in promise)的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
