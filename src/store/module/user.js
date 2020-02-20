import { Login, Authorization } from '@/api/Auth'
import { setToken } from '@/lib/util'
const state = {
  //
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
          resolve() // 带入的方法
        } else {
          reject(new Error('错误')) //
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
          console.log('authorization-success')
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
  }

}
export default {
  state,
  mutations,
  actions
}
