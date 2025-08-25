<template>
  <div class="about-page">
    <div class="page-header">
      <h1 class="page-title">关于应用</h1>
      <p class="page-subtitle">当前应用的相关信息和配置</p>
    </div>

    <div class="content-section">
      <h2 class="section-title">应用信息</h2>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">应用名称：</span>
          <span class="info-value">{{ appInfo.name }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">版本：</span>
          <span class="info-value">{{ appInfo.version }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">构建时间：</span>
          <span class="info-value">{{ appInfo.buildTime }}</span>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">环境配置</h2>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">当前环境：</span>
          <span class="info-value" :class="getEnvClass()">{{ currentEnv }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">API基础URL：</span>
          <span class="info-value">{{ apiBaseUrl || '未配置' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">API超时时间：</span>
          <span class="info-value">{{ apiTimeout }}ms</span>
        </div>
        <div class="info-item">
          <span class="info-label">Mock状态：</span>
          <span class="info-value" :class="{ enabled: isMockEnabled, disabled: !isMockEnabled }">
            {{ isMockEnabled ? '已启用' : '已禁用' }}
          </span>
        </div>
        <div class="info-item">
          <span class="info-label">调试状态：</span>
          <span class="info-value" :class="{ enabled: isDebugEnabled, disabled: !isDebugEnabled }">
            {{ isDebugEnabled ? '已启用' : '已禁用' }}
          </span>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">技术栈</h2>
      <div class="tech-stack">
        <div class="tech-item">
          <span class="tech-name">Vue.js</span>
          <span class="tech-version">{{ vueVersion }}</span>
        </div>
        <div class="tech-item">
          <span class="tech-name">TypeScript</span>
          <span class="tech-version">{{ typescriptVersion }}</span>
        </div>
        <div class="tech-item">
          <span class="tech-name">SCSS</span>
          <span class="tech-version">支持</span>
        </div>
        <div class="tech-item">
          <span class="tech-name">Element UI</span>
          <span class="tech-version">{{ elementVersion }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AboutIndex',
  data() {
    return {
      appInfo: {
        name: process.env.VUE_APP_TITLE || 'Vue2 TypeScript 模板项目',
        version: process.env.VUE_APP_VERSION || '1.0.0',
        buildTime: new Date().toLocaleString('zh-CN')
      },
      // 环境配置（从环境变量一次性读取，运行期不变）
      currentEnv: process.env.VUE_APP_ENV || process.env.NODE_ENV || '',
      apiBaseUrl: process.env.VUE_APP_API_BASE_URL || '',
      apiTimeout: parseInt(process.env.VUE_APP_API_TIMEOUT || '', 10),
      isMockEnabled: process.env.VUE_APP_ENABLE_MOCK === 'true',
      isDebugEnabled: process.env.VUE_APP_ENABLE_DEBUG === 'true',
      // 技术栈版本
      vueVersion: Vue.version || '2.x',
      typescriptVersion: '4.x+',
      elementVersion: '2.x'
    }
  },
  methods: {
    // 获取环境样式类
    getEnvClass(): string {
      const env = this.currentEnv
      switch (env) {
        case 'development':
          return 'env-dev'
        case 'production':
          return 'env-prod'
        case 'test':
          return 'env-test'
        default:
          return 'env-unknown'
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;

  .page-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 10px 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .page-subtitle {
    font-size: 1.1rem;
    margin: 0;
    opacity: 0.9;
  }
}

.content-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;

  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 20px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid #e5e7eb;
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;

  .info-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: #f9fafb;
    border-radius: 8px;
    border: 1px solid #e5e7eb;

    .info-label {
      font-weight: 600;
      color: #374151;
      min-width: 120px;
      margin-right: 12px;
    }

    .info-value {
      color: #1f2937;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 0.9rem;
    }
  }
}

.tech-stack {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;

  .tech-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    border-radius: 10px;
    border: 1px solid #d1d5db;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    .tech-name {
      font-weight: 600;
      color: #1f2937;
      font-size: 1.1rem;
      margin-bottom: 8px;
    }

    .tech-version {
      color: #6b7280;
      font-size: 0.9rem;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    }
  }
}

// 环境状态样式
.env-dev {
  color: #059669;
  font-weight: 600;
}

.env-prod {
  color: #dc2626;
  font-weight: 600;
}

.env-test {
  color: #d97706;
  font-weight: 600;
}

.env-unknown {
  color: #6b7280;
  font-weight: 600;
}

.enabled {
  color: #059669;
  font-weight: 600;
}

.disabled {
  color: #dc2626;
  font-weight: 600;
}

// 响应式设计
@media (max-width: 768px) {
  .about-page {
    padding: 16px;
  }

  .page-header {
    padding: 20px 0;

    .page-title {
      font-size: 2rem;
    }
  }

  .content-section {
    padding: 16px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .tech-stack {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .tech-stack {
    grid-template-columns: 1fr;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;

    .info-label {
      margin-bottom: 8px;
      margin-right: 0;
    }
  }
}
</style>
