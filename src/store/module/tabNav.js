import { routeHasExist, getRouteById, localSave, localRead, routeEqual } from '@/lib/util'
import { localTabList } from '@/config/localStorageName'

const state = {
  // tabList: []
  tabList: JSON.parse(localRead(localTabList) || '[]')
}

const getTabListToLocal = tabList => {
  return tabList.map(item => {
    return {
      name: item.name,
      path: item.path,
      meta: item.meta,
      params: item.params,
      query: item.query
    }
  })
}

const mutations = {
  UPDATE_ROUTER (state, route) {
    // if (!state.tabList.find(item => item.name === route.name)) { state.tabList.push(route) }
    if (!routeHasExist(state.tabList, route)) { state.tabList.push(route) }
    localSave(localTabList, JSON.stringify(getTabListToLocal(state.tabList)))
  },
  REMOVE_TAB (state, index) {
    state.tabList.splice(index, 1)
    localSave(localTabList, JSON.stringify(getTabListToLocal(state.tabList)))
  }
}

const actions = {
  handleRemove ({ commit }, { id, $route }) {
    return new Promise((resolve) => {
      const route = getRouteById(id)
      const index = state.tabList.findIndex(item => {
        return routeEqual(route, item)
      })
      // 对关闭当前页面 页面跳转
      const len = state.tabList.length
      let nextRoute = {}
      if (routeEqual($route, state.tabList[index])) {
        if (index < len - 1) nextRoute = state.tabList[index + 1]
        else if (index === len - 1) nextRoute = state.tabList[index - 1]
      }
      const { name, params, query } = nextRoute || { name: 'home_index' }
      commit('REMOVE_TAB', index)
      resolve({
        name, params, query
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
