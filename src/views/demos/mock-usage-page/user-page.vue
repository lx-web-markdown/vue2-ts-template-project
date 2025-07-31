<template>
  <div class="user-page">
    <div class="user-card" v-if="user">
      <h2>👤 用户信息</h2>
      <ul>
        <li><strong>ID：</strong>{{ user.id }}</li>
        <li><strong>姓名：</strong>{{ user.name }}</li>
        <li><strong>年龄：</strong>{{ user.age }}</li>
        <li><strong>邮箱：</strong>{{ user.email }}</li>
      </ul>
    </div>
    <button class="fetch-btn" @click="fetchUser">获取用户</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MockUserView',
  data() {
    return {
      user: null
    }
  },
  methods: {
    async fetchUser() {
      try {
        const response = await axios.get('/api/user')
        this.user = response.data.data
      } catch (error) {
        console.error('请求失败:', error)
      }
    }
  }
}
</script>

<style scoped>
.user-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f7f8fa;
}
.user-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 32px 40px;
  margin-bottom: 32px;
  min-width: 320px;
  text-align: left;
}
.user-card h2 {
  margin-bottom: 18px;
  color: #409eff;
  font-weight: 600;
}
.user-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.user-card li {
  margin-bottom: 10px;
  font-size: 16px;
}
.fetch-btn {
  background: linear-gradient(90deg, #409eff 0%, #66b1ff 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.12);
  transition: background 0.2s;
}
.fetch-btn:hover {
  background: linear-gradient(90deg, #66b1ff 0%, #409eff 100%);
}
</style>
