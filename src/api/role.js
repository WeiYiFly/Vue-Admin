import axios from './index'

export const GetRoleList = (data) => {
  return axios.request({
    url: '/System/GetRoleList',
    method: 'post',
    data
  })
}

export const AddRole = (data) => {
  return axios.request({
    url: '/System/AddRole',
    method: 'post',
    data
  })
}

export const EditRole = (data) => {
  return axios.request({
    url: '/System/EditRole',
    method: 'post',
    data
  })
}
export const DeleteRole = ({ Id }) => {
  return axios.request({
    url: '/System/DeleteRole',
    method: 'post',
    data: {
      Id
    }
  })
}

export const GetRoleModuleTree = ({ Id }) => {
  return axios.request({
    url: '/System/GetRoleModuleTree',
    method: 'post',
    data: {
      Id
    }
  })
}

export const GetRoleModuleElementList = ({ Id }) => {
  return axios.request({
    url: '/System/GetRoleModuleElementList',
    method: 'post',
    data: {
      Id
    }
  })
}
export const SetRoleModuleElementList = ({ ModuleId, ElementId, RoleId }) => {
  return axios.request({
    url: '/System/SetRoleModuleElementList',
    method: 'post',
    data: {
      ModuleId,
      ElementId,
      RoleId
    }
  })
}
