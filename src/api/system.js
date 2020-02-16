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
// 获取模块tree 列表数据 GetModuleTree()
export const GetModuleTree = () => {
  return axios.request({
    url: '/System/GetModuleTree',
    method: 'get'
  })
}
