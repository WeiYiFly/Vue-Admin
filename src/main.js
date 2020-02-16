import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import iview from 'iview'
import i18n from './i18n'
// import 'iview/dist/styles/iview.css'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
if (process.env.NODE_ENV !== 'production') require('./mock')

Vue.config.productionTip = false
// 安装Vue插件
// Vue.use(iview)
Vue.use(ViewUI)
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
