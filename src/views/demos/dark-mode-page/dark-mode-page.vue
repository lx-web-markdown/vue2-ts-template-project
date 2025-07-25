<template>
  <div class="dark-mode-demo" :class="themeClass">
    <h1>暗黑模式切换演示</h1>
    <p>
      本页面演示如何在 Vue2 + TypeScript 项目中实现三种主题模式：<br />
      <b>暗黑模式</b>、<b>白天模式</b>、<b>跟随系统</b>。<br />
      你可以通过下方按钮切换主题，选择“跟随系统”时，主题会自动根据操作系统的深色/浅色模式变化。
    </p>
    <div class="mode-switch">
      <button :class="{ active: mode === 'light' }" @click="setMode('light')">白天模式</button>
      <button :class="{ active: mode === 'dark' }" @click="setMode('dark')">暗黑模式</button>
      <button :class="{ active: mode === 'auto' }" @click="setMode('auto')">跟随系统</button>
    </div>
    <div class="demo-box">
      <h2>主题效果示例</h2>
      <p>
        当前模式：<b>{{ modeLabel }}</b>
      </p>
      <div class="sample-card">
        <p>这是一个示例卡片，随主题变化。</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const THEME_KEY = 'theme-mode-v2-demo'
type ThemeMode = 'light' | 'dark' | 'auto'

export default Vue.extend({
  data() {
    return {
      mode: 'auto' as ThemeMode,
      systemDark: false
    }
  },
  computed: {
    themeClass(this: any) {
      if (this.mode === 'auto') {
        return this.systemDark ? 'theme-dark' : 'theme-light'
      }
      return this.mode === 'dark' ? 'theme-dark' : 'theme-light'
    },
    modeLabel(this: any) {
      if (this.mode === 'auto') {
        return `跟随系统（当前${this.systemDark ? '暗黑' : '白天'}）`
      }
      return this.mode === 'dark' ? '暗黑模式' : '白天模式'
    }
  },
  mounted() {
    // 读取本地存储
    const saved = localStorage.getItem(THEME_KEY) as ThemeMode | null
    if (saved === 'light' || saved === 'dark' || saved === 'auto') {
      this.mode = saved
    }
    this.listenSystemTheme()
  },
  beforeDestroy() {
    this.removeSystemListener()
  },
  methods: {
    setMode(this: any, mode: ThemeMode) {
      this.mode = mode
      localStorage.setItem(THEME_KEY, mode)
      if (mode === 'auto') {
        this.listenSystemTheme()
      } else {
        this.removeSystemListener()
      }
    },
    listenSystemTheme(this: any) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      this.systemDark = mq.matches
      console.log('====== a =======>', mq, mq.matches)
      if (mq.addEventListener) {
        mq.addEventListener('change', this.handleSystemChange)
      } else {
        mq.addListener(this.handleSystemChange)
      }
    },
    removeSystemListener(this: any) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      if (mq.removeEventListener) {
        mq.removeEventListener('change', this.handleSystemChange)
      } else {
        mq.removeListener(this.handleSystemChange)
      }
    },
    handleSystemChange(this: any, e: MediaQueryListEvent) {
      this.systemDark = e.matches
    }
  }
})
</script>

<style lang="scss" scoped>
.dark-mode-demo {
  max-width: 600px;
  margin: 40px auto;
  padding: 32px 24px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  background: var(--bg);
  color: var(--text);
  transition: background 0.3s, color 0.3s;

  h1 {
    margin-bottom: 16px;
  }
  p {
    margin-bottom: 16px;
    line-height: 1.7;
  }
  .mode-switch {
    margin-bottom: 32px;
    button {
      margin-right: 12px;
      padding: 6px 18px;
      border: none;
      border-radius: 6px;
      background: #eee;
      color: #333;
      cursor: pointer;
      font-size: 15px;
      &.active {
        background: #409eff;
        color: #fff;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .demo-box {
    margin-top: 24px;
    padding: 20px;
    border-radius: 8px;
    background: var(--box-bg);
    color: var(--box-text);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
    transition: background 0.3s, color 0.3s;
    .sample-card {
      margin-top: 16px;
      padding: 18px;
      border-radius: 6px;
      background: var(--card-bg);
      color: var(--card-text);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
      font-size: 16px;
      transition: background 0.3s, color 0.3s;
    }
  }
}

.theme-light {
  --bg: #fff;
  --text: #222;
  --box-bg: #f7f8fa;
  --box-text: #222;
  --card-bg: #fff;
  --card-text: #333;
}
.theme-dark {
  --bg: #181c27;
  --text: #e6e6e6;
  --box-bg: #23263a;
  --box-text: #e6e6e6;
  --card-bg: #56596b;
  --card-text: #e6e6e6;
}
</style>
