import Vue from 'vue'
import App from '@/views/layouts/App.vue'
import router from './router'
import store from './store'
import myI18n from '@/i18n'
// 通用样式
import '@/assets/css/common.scss'
// 导入 mock 文件
import '@/server/mock/mock'
//
import '@/plugins/element-ui'
import '@/utils/vue-config-setting'

new Vue({
  router,
  store,
  i18n: myI18n,
  render: (h) => h(App)
}).$mount('#app')
