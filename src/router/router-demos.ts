export default [
  {
    path: '/i18n-demo',
    component: () => import('@/views/demos/i18n-page/index.vue')
  },
  {
    path: '/dark-mode-demo',
    component: () => import('@/views/demos/dark-mode/dark-mode-page.vue')
  }
]
