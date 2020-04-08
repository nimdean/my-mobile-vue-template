const MOCK = require('mockjs')
MOCK.mock(/\/api\/weather\/city\//, 'get', { // 因为axios拦截器给所有请求都拼接了时间戳，所以拦截器只能用正则来匹配
  status: 'error',
  msg: '天气查询失败'
})