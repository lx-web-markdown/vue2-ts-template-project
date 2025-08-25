const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

  // 定义环境变量
  chainWebpack: (config) => {
    config.plugin('define').tap((args) => {
      args[0]['process.env'] = {
        ...args[0]['process.env'],
        VUE_APP_PROJECT_NAME: JSON.stringify(process.env.VUE_APP_PROJECT_NAME || 'Vue2 TypeScript 模板项目'),
        VUE_APP_PROJECT_VERSION: JSON.stringify(process.env.VUE_APP_PROJECT_VERSION || '1.0.0')
      }
      return args
    })
  },

  /*
  // 启用模板编译器（会增加包体积）
  runtimeCompiler: true, 
  // 等价于
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js'
      }
    }
  },
  */

  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
