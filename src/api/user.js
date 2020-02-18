import axios from './index'

export const getUserInfo = () => {
  return axios.request({
    url: '/Account/Tset',
    method: 'get'
  })
}

export const GetUserList = (data) => {
  return axios.request({
    url: '/System/GetUserList',
    method: 'post',
    data
  })
}

export const AddUser = (data) => {
  return axios.request({
    url: '/System/AddUser',
    method: 'post',
    data
  })
}

export const EditUser = (data) => {
  return axios.request({
    url: '/System/EditUser',
    method: 'post',
    data
  })
}
export const DeleteUser = ({ Id }) => {
  return axios.request({
    url: '/System/DeleteUser',
    method: 'post',
    data: {
      Id
    }
  })
}

export const GetUserRoleData = ({ Id }) => {
  return axios.request({
    url: '/System/GetUserRoleData',
    method: 'post',
    data: {
      Id
    }
  })
}
export const SetUserRole = ({ UserId, RoleId }) => {
  return axios.request({
    url: '/System/SetUserRole',
    method: 'post',
    data: {
      UserId,
      RoleId
    }
  })
}
