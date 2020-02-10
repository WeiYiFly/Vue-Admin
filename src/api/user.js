import axios from './index'

export const getUserInfo = () => {
  return axios.request({
    url: '/FingerPrint/getFingerPrint',
    method: 'get'

  })
}
