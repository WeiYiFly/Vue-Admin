import axios from './index'

export const getUserInfo = () => {
  return axios.request({
    url: '/Account/Tset',
    method: 'get'
  })
}
