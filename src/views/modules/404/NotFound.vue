<template>
  <div>
    <div class="main-page">
      <img :src="img404" alt="" />

      <div class="btn-div">
        <button class="back-home-btn" type="primary" size="large" @click="onClickBackHome">返回首页</button>
        <button class="back-last-btn" type="default" size="large" @click="onClickBack">返回上一页</button>
      </div>
    </div>
  </div>
</template>

<script>
import img404 from '@/assets/images/404.jpg'

export default {
  name: 'NotFound',
  data() {
    return {
      img404
    }
  },
  methods: {
    onClickBackHome() {
      this.$router.push({ path: '/' })
    },
    onClickBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
.main-page {
  margin: 0 auto;
  text-align: center;
  font-weight: 800;

  .btn-div {
    .back-home-btn {
      margin-top: 50px;
      width: 200px;
      height: 50px;
      border-radius: 10px;
    }

    .back-last-btn {
      margin-left: 20px;
      margin-top: 50px;
      width: 200px;
      height: 50px;
      border-radius: 10px;
    }
  }
}
</style>
