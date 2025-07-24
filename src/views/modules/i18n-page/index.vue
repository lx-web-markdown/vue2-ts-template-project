<template>
  <div class="i18n-demo-page">
    <h1>Vue2 + vue-i18n 国际化详细用法</h1>
    <section class="desc-section">
      <h2>1. 基本原理与配置</h2>
      <p>
        vue-i18n 通过 <code>Vue.use(VueI18n)</code> 注册插件，并在 new Vue 时传入
        <code>i18n</code> 选项。语言包采用多层级对象结构，支持多语言切换。
      </p>
      <pre><code v-pre>
// src/i18n/index.ts

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './lang/zh'
import en from './lang/en'

Vue.use(VueI18n)

const messages = { zh, en }

const i18n = new VueI18n({ 
  locale: 'zh', messages 
})

export default i18n
      </code></pre>
    </section>

    <section class="desc-section">
      <h2>2. 语言包结构与多层级 key</h2>
      <pre><code v-pre>
// src/i18n/lang/zh.ts

export default {
  message: {
    hello: '你好',
    welcome: '欢迎, {name}!'
  },
  menu: {
    home: '首页',
    about: '关于'
  }
}
      </code></pre>
    </section>

    <section class="desc-section">
      <h2>3. 模板与 JS 中的用法</h2>
      <ul>
        <li>
          模板：<code v-pre>{{ $t('message.hello') }}</code>
        </li>
        <li>JS：<code v-pre>this.$t('message.hello')</code></li>
        <li>
          多层级：<code v-pre>{{ $t('menu.home') }}</code>
        </li>
      </ul>
      <div class="demo-block">
        <p>{{ $t('message.hello') }}</p>
        <p>{{ $t('menu.home') }}</p>
      </div>
    </section>

    <section class="desc-section">
      <h2>4. 动态切换语言</h2>
      <p>通过设置 <code>this.$i18n.locale</code> 实现语言切换，并可结合 localStorage 持久化。</p>
      <div class="lang-switch">
        <span v-for="item in langList" :key="item.value">
          <button :class="{ active: currentLang === item.value }" @click="changeLang(item.value)">
            {{ item.name }}
          </button>
        </span>
      </div>
      <div class="demo-block">
        <p>{{ $t('message.hello') }}</p>
        <p>{{ $t('message.changeLang') }}</p>
      </div>
    </section>

    <section class="desc-section">
      <h2>5. 插值、占位符与 HTML</h2>
      <pre><code v-pre>
// 语言包
message: {
  welcome: '欢迎, {name}!'
}

// 使用
{{$t('message.welcome', { name: '小明' })}}
      </code></pre>
      <div class="demo-block">
        <p>{{ $t('message.welcome', { name: userName }) }}</p>
      </div>
      <pre><code v-pre>
// 支持 HTML
message: {
  html: '支持 <b>HTML</b> 内容'
}

// 使用
&lt;span v-html=&quot;$t(&#x27;message.html&#x27;)&quot;&gt;&lt;/span&gt;
      </code></pre>
      <div class="demo-block">
        <span v-html="$t('message.html')"></span>
      </div>
    </section>

    <section class="desc-section">
      <h2>6. 复数/条件/格式化（进阶）</h2>
      <pre><code v-pre>
// 复数
car: '无车 | 一辆车 | {count} 辆车'
{{$tc('car', 0)}} // 无车
{{$tc('car', 1)}} // 一辆车
{{$tc('car', 5, { count: 5 })}} // 5 辆车
      </code></pre>
      <div class="demo-block">
        <p>{{ $tc('car', carCount, { count: carCount }) }}</p>
        <button @click="carCount++" style="margin-right: 10px">+1</button>
        <button @click="carCount = 0">重置</button>
      </div>
    </section>

    <section class="desc-section">
      <h2>7. 常见问题与最佳实践</h2>
      <ul>
        <li>建议所有 key 统一命名风格，分模块管理</li>
        <li>避免 key 冲突，保持多语言包结构一致</li>
        <li>可用 computed 封装常用翻译</li>
        <li>支持异步加载语言包（适合大型项目）</li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { setCurrentLocaleKey } from '@/i18n'

export default Vue.extend({
  name: 'I18nDetailPage',
  data() {
    return {
      langList: [
        { name: '中文', value: 'zh' },
        { name: 'English', value: 'en' },
        { name: '日本語', value: 'ja' },
        { name: '한국어', value: 'ko' }
      ],
      userName: '小明',
      carCount: 0
    }
  },
  computed: {
    currentLang(): string {
      return this.$i18n.locale
    }
  },
  methods: {
    changeLang(lang: string) {
      this.$i18n.locale = lang
      setCurrentLocaleKey(lang)
    }
  }
})
</script>

<style scoped lang="scss">
.i18n-demo-page {
  max-width: 800px;
  margin: 30px auto;
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px #eee;
  font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  color: #222;
}
.desc-section {
  margin-bottom: 36px;
  background: #f7faff;
  border-left: 4px solid #409eff;
  padding: 18px 24px 8px 24px;
  border-radius: 6px;
  text-align: left;
}
.demo-block {
  background: #f9f9f9;
  border: 1px dashed #bbb;
  padding: 12px 18px;
  margin: 12px 0 18px 0;
  border-radius: 5px;
}
.lang-switch {
  margin: 10px 0 18px 0;
  button {
    margin-right: 10px;
    padding: 4px 16px;
    border: none;
    border-radius: 4px;
    background: #e3eafc;
    color: #333;
    cursor: pointer;
    &.active {
      background: #409eff;
      color: #fff;
    }
  }
}
</style>
