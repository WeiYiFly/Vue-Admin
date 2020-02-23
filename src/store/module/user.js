import { Login, Authorization } from '@/api/Auth'
import { setToken, localSave, localRead, ListToTree } from '@/lib/util'
import { localUserInfo, localUserInfoModuleList, localTabList } from '@/config/localStorageName'
import clonedeep from 'clonedeep'
const state = {
  //
  userinfo: JSON.parse(localRead(localUserInfo) || '[]'),
  userinfoModuleList: JSON.parse(localRead(localUserInfoModuleList) || '[]'),
  whiteRoutername: ['login', 'home', 'error']
}
const mutations = {
  //
}
const actions = {
  updateUserName ({ commit, state, rootState, dispatch }) {
    // rootState.appName
  },
  login ({ commit }, { Account, Password }) {
    return new Promise((resolve, reject) => {
      Login({ Account, Password }).then(res => {
        if (res.Code === 200 && res.Result.Token) {
          setToken(res.Result.Token)
          // 添加首页
          var homedata = { Id: 'cf91b511-7c72-4e2a-9310-b1629bf8f647', Name: '首页', RouterName: 'home' }
          res.Result.ModuleList = [homedata, ...res.Result.ModuleList]
          localSave(localUserInfo, JSON.stringify(res.Result))
          state.userinfo = res.Result
          // 整理菜单树
          var rdata = ListToTree({
            arrayList: clonedeep(res.Result.ModuleList),
            pidStr: 'ParentId',
            idStr: 'Id',
            childrenStr: 'children'
          })

          // rdata = [homedata, ...rdata]
          console.log(rdata)
          localSave(localUserInfoModuleList, JSON.stringify(rdata))
          state.userinfoModuleList = rdata

          resolve() // 带入的方法
        } else {
          localSave(localUserInfo, '')
          localSave(localUserInfoModuleList, '')
          state.userinfo = []
          reject(res) //
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  authorization ({ commit }, token) {
    return new Promise((resolve, reject) => {
      Authorization().then(res => {
        if (res.Code === 200) {
          // console.log('authorization-success')
          resolve()
        } else {
          reject(new Error('token error'))
          // resolve(res.data.rules.page)
          // commit('SET_RULES', res.data.rules.component)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout () {
    setToken('')
    localSave(localUserInfo, '')
    localSave(localUserInfoModuleList, '')
    localSave(localTabList, '')
  },
  JudgeRoutername  ({ commit }, routername) {
    return new Promise((resolve, reject) => {
      // resolve() // 测试
      // console.log(routername)
      // console.log('JudgeRoutername')
      if (routername === undefined) resolve()
      var windex = state.whiteRoutername.findIndex(u => u === routername)
      // console.log(windex)
      if (windex > -1) {
        resolve()
      }
      var index = state.userinfo.ModuleList.findIndex(u => u.RouterName === routername)
      // console.log(index)
      if (index > -1) {
        resolve()
      } else {
        reject(new Error('没有权限'))
      }
    })
  }

}
export default {
  state,
  mutations,
  actions
}
