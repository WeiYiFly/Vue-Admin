export const baseURL = process.env.NODE_ENV === 'production'
  ? 'http://182.61.14.181:831/api' // 正式
  : 'http://localhost:52456/api' // 测试
  // : 'http://localhost:52456/api' // 测试
