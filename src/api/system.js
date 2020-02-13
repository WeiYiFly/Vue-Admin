import axios from './index'

export const GetModuleList = (data) => {
  return axios.request({
    url: '/System/GetModuleList',
    method: 'post',
    data
  })
}

export const AddModule = (data) => {
  return axios.request({
    url: '/System/AddModule',
    method: 'post',
    data
  })
}

export const EditModule = (data) => {
  return axios.request({
    url: '/System/EditModule',
    method: 'post',
    data
  })
}
export const DeleteModule = ({ Id }) => {
  return axios.request({
    url: '/System/DeleteModule',
    method: 'post',
    data: {
      Id
    }
  })
}
