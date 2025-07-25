// 在 src/mixins/darkMode.js
export default {
  data() {
    return {
      isSystemDarkMode: false
    }
  },
  created() {
    console.log('🛫 mixin =============> created')
    this.initDarkModeListener()
  },
  beforeDestroy() {
    console.log('🛫 mixin =============> beforeDestroy')
    this.removeDarkModeListener()
  },
  methods: {
    initDarkModeListener() {
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      // 设置初始状态
      this.isSystemDarkMode = darkModeMediaQuery.matches
      this.updateDarkModeClass()

      // 添加监听器
      this.darkModeListener = (e) => {
        this.isSystemDarkMode = e.matches
        this.updateDarkModeClass()
      }
      if (darkModeMediaQuery.addEventListener) {
        darkModeMediaQuery.addEventListener('change', this.darkModeListener)
      } else {
        darkModeMediaQuery.addListener(this.darkModeListener)
      }
    },
    removeDarkModeListener() {
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      if (this.darkModeListener) {
        if (darkModeMediaQuery.removeEventListener) {
          darkModeMediaQuery.removeEventListener('change', this.darkModeListener)
        } else {
          darkModeMediaQuery.removeListener(this.darkModeListener)
        }
      }
    },
    updateDarkModeClass() {
      console.log('🛫 mixin =============> updateDarkModeClass')
      if (this.isSystemDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }
}
