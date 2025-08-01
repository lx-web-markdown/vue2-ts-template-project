<template>
  <div class="home-page">
    <div class="header">
      <h1 class="title">Vue2 演示项目</h1>
      <p class="subtitle">探索各种 Vue2 功能和示例</p>
    </div>

    <div class="content">
      <!-- 快速导航 -->
      <div class="quick-nav">
        <div class="nav-row" v-for="(row, rowIdx) in navRows" :key="rowIdx">
          <router-link v-for="nav in row" :key="nav.to" :to="nav.to" class="nav-card">
            <div class="nav-icon">{{ nav.icon }}</div>
            <div class="nav-text">
              <p class="nav-text-title">{{ nav.title }}</p>
              <p class="nav-text-desc">{{ nav.desc }}</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- 演示文件列表 -->
      <div class="demo-section">
        <h2 class="section-title">HTML 演示文件</h2>
        <div class="demo-grid">
          <div v-for="(itemValue, itemKey) in htmlFilesList" :key="itemKey" class="demo-category">
            <h3 class="category-title">{{ itemKey }}</h3>
            <div class="demo-list">
              <div
                v-for="subItemValue in itemValue"
                :key="subItemValue.fileName"
                class="demo-item"
                @click="openFile(subItemValue)"
              >
                <span class="demo-name">{{ subItemValue.fileName }}</span>
                <span class="demo-icon">📄</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface FileItem {
  fileName: string
  filePath: string
}

interface HtmlFilesList {
  [key: string]: FileItem[]
}

export default Vue.extend({
  name: 'DemoListPage',
  data() {
    return {
      htmlFilesList: {} as HtmlFilesList,
      navList: [
        {
          to: '/i18n-demo',
          icon: '🌐',
          title: '国际化设置',
          desc: 'i18n 多语言配置'
        },
        {
          to: '/dark-mode-demo',
          icon: '🐶',
          title: 'Vue2 暗黑配置',
          desc: '全局配置 keyCodes'
        },
        {
          to: '/scss-constant-demo',
          icon: '🐯',
          title: 'Scss常量',
          desc: 'Scss常量如何使用'
        },
        {
          to: '/event-bus-demo',
          icon: '📢',
          title: 'Event Bus 示例',
          desc: '事件总线通信方案'
        },
        {
          to: '/vue-router-demo',
          icon: '🦌',
          title: 'Vue Router 示例',
          desc: 'Vue2路由'
        },
        {
          to: '/vuex-demo',
          icon: '🦌',
          title: 'VueX 示例',
          desc: 'VueX使用'
        },
        {
          to: '/mock-demo',
          icon: '🐟',
          title: 'Mock.js 示例',
          desc: 'Mock + Axios使用'
        }
      ]
    }
  },
  computed: {
    navRows(): Array<Array<any>> {
      // 每行最多3个
      const chunkSize = 3
      const rows = []
      for (let i = 0; i < this.navList.length; i += chunkSize) {
        rows.push(this.navList.slice(i, i + chunkSize))
      }
      return rows
    }
  },
  mounted() {
    this.loadHtmlFiles()
  },
  methods: {
    async loadHtmlFiles() {
      try {
        const response = await fetch('/htmlFiles.json')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        this.htmlFilesList = await response.json()
        console.log('=============>', this.htmlFilesList)
      } catch (error) {
        console.error('获取演示文件列表失败:', error)
      }
    },
    openFile(fileObj: FileItem) {
      console.log('打开文件:', fileObj.fileName, fileObj.filePath)
      window.open(fileObj.filePath, '_blank')
    }
  }
})
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 3rem;

  .title {
    font-size: 3rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .subtitle {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
  }
}

.content {
  max-width: 1200px;
  margin: 0 auto;
}

.quick-nav {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;

  .nav-row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }

  .nav-card {
    flex: 1 1 auto;

    display: flex;
    align-items: center;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      background: white;
    }

    .nav-icon {
      font-size: 2rem;
      margin-right: 1rem;
    }

    .nav-text {
      &-title {
        color: #000;
        font-weight: 900;
        font-size: 20px;
        text-align: left;
      }

      &-desc {
        font-size: 16px;
        color: #7f8c8d;
        text-align: left;
      }
    }
  }
}

.demo-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 1.5rem 0;
    text-align: center;
  }
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.demo-category {
  .category-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #34495e;
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #3498db;
  }
}

.demo-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.demo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  &:hover {
    background: #e3f2fd;
    border-color: #2196f3;
    transform: translateX(4px);
  }

  .demo-name {
    font-size: 0.9rem;
    color: #2c3e50;
    font-weight: 500;
    text-align: left;
  }

  .demo-icon {
    font-size: 1rem;
    opacity: 0.7;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .home-page {
    padding: 1rem;
  }

  .header .title {
    font-size: 2rem;
  }

  .quick-nav {
    grid-template-columns: 1fr;
  }

  .demo-grid {
    grid-template-columns: 1fr;
  }

  .demo-section {
    padding: 1.5rem;
  }
}
</style>
