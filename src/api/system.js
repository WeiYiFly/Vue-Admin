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

// 菜单模块
export const GetModuleElementList = (data) => {
  return axios.request({
    url: '/System/GetModuleElementList',
    method: 'post',
    data
  })
}

export const AddModuleElement = (data) => {
  return axios.request({
    url: '/System/AddModuleElement',
    method: 'post',
    data
  })
}

export const EditModuleElement = (data) => {
  return axios.request({
    url: '/System/EditModuleElement',
    method: 'post',
    data
  })
}
export const DeleteModuleElement = ({ Id }) => {
  return axios.request({
    url: '/System/DeleteModuleElement',
    method: 'post',
    data: {
      Id
    }
  })
}
export const DeleteModuleElementBatch = ({ key }) => {
  return axios.request({
    url: '/System/DeleteModuleElementBatch',
    method: 'post',
    data: {
      key: key
    }
  })
}
