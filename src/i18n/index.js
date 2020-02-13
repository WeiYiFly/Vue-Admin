import VueI18n from 'vue-i18n'
import Vue from 'vue'
import iView from 'iview'
import { localLanguage } from '@/config/localStorageName'
import { localRead } from '@/lib/util'
import ienUS from 'iview/dist/locale/en-US'
import izhCN from 'iview/dist/locale/zh-CN'
import enUS from './en-US'
import zhCN from './zh-CN'

Vue.use(VueI18n)
Vue.locale = () => {}
const messages = {
  'en-US': Object.assign(ienUS, enUS), // 将自己的英文包和iview提供的结合
  'zh-CN': Object.assign(izhCN, zhCN) // 将自己的中文包和iview提供的结合
}

const i18n = new VueI18n({
  locale: localRead(localLanguage) || 'zh-CN', // 语言标识
  messages
})

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
// 上面这个比较重要 按照官网提供的方法 new Vue({ i18n }).$mount('#app'); 运行会出错 提示无法找到  _t 属性。 按照上述方法配置可以解决此问题(网上找的方法,亲测没问题)

export default i18n
