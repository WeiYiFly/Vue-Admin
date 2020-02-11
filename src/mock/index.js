import Mock from 'mockjs'
import { getUserInfo } from './response/user'

// 拦截地址
// Mock.mock('https://sc.94rp.com/FingerPrint/getFingerPrint', getUserInfo)
Mock.mock(/\/FingerPrint/, getUserInfo)
export default Mock
