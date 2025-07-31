import Vue from 'vue'
import App from '@/views/layouts/App.vue'
import router from './router'
import store from './store'
import myI18n from '@/i18n'
// 通用样式
import '@/assets/css/common.scss'
//
import '@/plugins/element-ui'
import '@/utils/vue-config-setting'

// 仅在开发环境引入 Mock
if (process.env.NODE_ENV === 'development') {
  import('@/server/mock/index')
}

// 暗黑
import DarkModeMixin from './mixins/darkMode'
Vue.mixin(DarkModeMixin)

new Vue({
  router,
  store,
  i18n: myI18n,
  render: (h) => h(App)
}).$mount('#app')
