// 存放 业务结合的方法
//
//* *********************** */
import { doCustomTimes, objEqual } from './tools'

// 判断路由是否存在
export const routeHasExist = (tabList, routeItem) => {
  const len = tabList.length
  let res = false
  doCustomTimes(len, (index) => {
    if (routeEqual(tabList[index], routeItem)) res = true
  })
  return res
}
// 对比两个路由对象是否想等
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return route1.name === route2.name && objEqual(params1, params2) && objEqual(query1, query2)
}

// 对象 => 数组
const getKeyValueArr = obj => {
  const arr = []
  Object.entries(obj).sort((a, b) => {
    return a[0] - b[0]
  }).forEach(([_key, _val]) => {
    arr.push(_key, _val)
  })
  return arr
}
// 获取Layout Tab的名字
export const getTabNameByRoute = route => {
  const { name, params, query } = route
  let res = name
  if (params && Object.keys(params).length) res += ':' + getKeyValueArr(params).join('_')
  if (query && Object.keys(query).length) res += '&' + getKeyValueArr(query).join('_')
  return res
}

// &a_111_b_222  [a,111,b,222] {a:111 ,b:222}
const getObjBySplitStr = (id, splitStr) => {
  const splitArr = id.split(splitStr)
  const str = splitArr[splitArr.length - 1]
  const keyValArr = str.split('_')
  const res = {}
  let i = 0
  const len = keyValArr.length
  while (i < len) {
    res[keyValArr[i]] = keyValArr[i + 1]
    i += 2
  }
  return res
}
// 根据 id 解析获取 路由对象
export const getRouteById = id => {
  const res = {}
  if (id.includes('&')) {
    res.query = getObjBySplitStr(id, '&')
    id = id.split('&')[0]
  }
  if (id.includes(':')) {
    res.params = getObjBySplitStr(id, ':')
    id = id.split(':')[0]
  }
  res.name = id
  return res
}

// 获取展开Menu的参数 获取名字数组
export const getOpenArrByName = (name, routerList) => {
  let arr = []
  routerList.some(item => {
    if (item.name === name) {
      arr.push(item.name)
      return true
    }
    if (item.children && item.children.length) {
      const childArr = getOpenArrByName(name, item.children)
      if (childArr.length) {
        arr = arr.concat(item.name, childArr)
        return true
      }
    }
  })
  // console.log(arr)
  return arr
}

// 数据保留本地
export const localSave = (name, value) => {
  localStorage.setItem(name, value)
}
// 读取本地数据
export const localRead = (name) => {
  return localStorage.getItem(name)
}
