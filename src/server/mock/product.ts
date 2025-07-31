import Mock from 'mockjs'

// 商品信息接口类型
// interface Product {
//   id: number
//   name: string
//   price: number
// }

// 模拟 POST 请求
Mock.mock('/api/products', 'post', {
  code: 200,
  message: 'success',
  data: {
    'list|5-10': [
      {
        id: '@increment', // 自增 ID
        name: '@ctitle', // 随机中文标题
        price: '@float(100, 500, 2, 2)' // 随机价格（保留两位小数）
      }
    ]
  }
})
