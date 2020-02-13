export const baseURL = process.env.NODE_ENV === 'production'
  ? '/api/' // 正式
  : 'http://localhost:52456/api' // 测试
  // : 'http://localhost:2039' // 测试
