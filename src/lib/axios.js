import axios from 'axios'
import qs from 'qs'
import { baseURL } from '@/config'
import { getToken } from '@/lib/util'
// import store from '@/store'
class HttpRequest {
  constructor (baseUrl = baseURL) {
    // console.log(baseURL)
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      timeout: 3000 // 请求超时时长
    }
    return config
  }

  distroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors (instance, url) {
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show()
      }
      this.queue[url] = true
      config.headers.Authorization = getToken()

      // console.log('config--')
      console.log(config)
      // 将传入的参数序列化
      // {"page":1,"limit":10,"key":""}   => "page=2&limit=10&key="
      if (config.method === 'post') {
        config.data = qs.stringify(config.data)
      }
      // console.log(config)
      return config
    }, error => {
      return Promise.reject(error)
    })
    instance.interceptors.response.use(res => {
      // console.log('请求--success')
      // onsole.log(res)
      this.distroy(url)
      const { data } = res
      return data
    }, error => {
      this.distroy(url)
      return Promise.reject(error.response.data)
    })
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
