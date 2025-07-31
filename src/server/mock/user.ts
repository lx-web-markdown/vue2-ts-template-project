import Mock from 'mockjs'

// 用户信息接口类型
// type User = {
//   id: string
//   name: string
//   age: number
//   email: string
// }

// 模拟 GET 请求
Mock.mock('/api/user', 'get', {
  code: 200,
  message: 'success',
  data: {
    id: '@id', // 随机 ID
    name: '@cname', // 随机中文名
    age: '@integer(20, 50)', // 随机年龄
    email: '@email' // 随机邮箱
  }
})
