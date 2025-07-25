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
  }
]
