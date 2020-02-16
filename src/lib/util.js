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

// 把数组处理成适用于tree组件的数据
/**
  * @description 将扁平化数据 转换成 树状结构
  * @param {Array} arrayList 扁平化的数据
  * @param {String} pidStr parentId的key名
  * @param {String} idStr id的key名
  * @param {String} childrenStr children的key名
  */
export const ListToTree = ({ arrayList, pidStr = 'pid', idStr = 'id', childrenStr = 'children' }) => {
  const listOjb = {} // 用来储存{key: obj}格式的对象
  const treeList = [] // 用来储存最终树形结构数据的数组
  // 将数据变换成{key: obj}格式，方便下面处理数据
  for (let i = 0; i < arrayList.length; i++) {
    listOjb[arrayList[i][idStr]] = arrayList[i]
  }
  // 根据pid来将数据进行格式化
  for (let j = 0; j < arrayList.length; j++) {
    // 判断父级是否存在
    const haveParent = listOjb[arrayList[j][pidStr]]
    if (haveParent) {
      // 如果有没有父级children字段，就创建一个children字段
      !haveParent[childrenStr] && (haveParent[childrenStr] = [])
      // 在父级里插入子项
      haveParent[childrenStr].push(arrayList[j])
    } else {
      // 如果没有父级直接插入到最外层
      treeList.push(arrayList[j])
    }
  }
  return treeList
}
// 封装递归方法并执行
function deepSort (list, content) {
  var content1 = []
  for (var m = 0; m < list.length; m++) {
    for (var n = 0; n < content.length; n++) {
      if (list[m].Id === content[n].ParentId) {
        list[m].children.push(content[n])
      } else {
        content1.push(content[n])
      }
    }
  }
  for (var o = 0; o < list.length; o++) {
    deepSort(list[o].children, content1)
  }
  // console.log()
}
export const ListToTreeV2 = (ListData) => {
  const content = ListData
  // Object.assign(content, ListData)
  // console.log('ListToTreeV2')
  // console.log(content)

  var newlist = []
  for (var a = 0; a < ListData.length; a++) {
    content[a].children = []
  }
  // 拿出最高层级的元素----pid数值最小则层级最高，此处直接取"，省去很多麻烦的数据操作
  for (var b = 0; b < content.length; b++) {
    if (content[b].ParentId === '' || content[b].ParentId === null) {
      newlist = content.splice(b, 1)
    }
  }
  console.log('ListToTreeV2')
  console.log(content)
  console.log(newlist)
  deepSort(newlist, content)
  return newlist
}
