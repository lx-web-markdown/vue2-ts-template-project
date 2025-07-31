export default [
  {
    path: '/i18n-demo',
    component: () => import('@/views/demos/i18n-page/index.vue')
  },
  {
    path: '/dark-mode-demo',
    component: () => import('@/views/demos/dark-mode-page/dark-mode-page.vue')
  },
  {
    path: '/scss-constant-demo',
    component: () => import('@/views/demos/scss-constant-page/scss-constant-page.vue')
  },
  {
    path: '/event-bus-demo',
    component: () => import('@/views/demos/event-bus-page/event-bus-page.vue')
  },
  {
    path: '/vue-router-demo',
    component: () => import('@/views/demos/vue-router-page/vue-router-page.vue')
  },
  {
    path: '/vuex-demo',
    component: () => import('@/views/demos/vuex-page/vuex-page.vue')
  },
  {
    path: '/mock-demo',
    component: () => import('@/views/demos/mock-usage-page/user-page.vue')
  }
]
