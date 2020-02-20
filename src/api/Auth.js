import axios from './index'

// 检验token是否有效
export const Authorization = () => {
  return axios.request({
    url: '/Auth/GetStatus',
    method: 'get'
  })
}
// 登录接口
export const Login = ({ Account, Password }) => {
  return axios.request({
    url: '/Auth/Login',
    method: 'post',
    data: {
      Account,
      Password
    }
  })
}

export const Logout = ({ token }) => {
  return axios.request({
    url: '/Auth/Logout',
    method: 'post',
    data: {
      token
    }
  })
}
