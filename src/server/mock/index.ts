// src/server/mock/index.ts
import Mock from 'mockjs'

// 设置响应延迟（可选）
Mock.setup({
  timeout: '200-600' // 模拟请求延迟 200ms 至 600ms
})

import './user'
import './product'

console.log('Mock server is running...')
