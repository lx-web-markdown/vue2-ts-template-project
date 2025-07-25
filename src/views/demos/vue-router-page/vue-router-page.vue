<template>
  <div class="vue-router-demo">
    <h1>Vue Router 全面梳理（Vue2 + TS + SCSS）</h1>
    <section>
      <h2>一、安装与引入</h2>
      <pre><code>yarn add vue-router@3.6.5

// main.ts
import VueRouter from 'vue-router'
Vue.use(VueRouter)
</code></pre>
    </section>

    <section>
      <h2>二、基本用法（5+2 步）</h2>
      <ol>
        <li>安装 vue-router</li>
        <li>main.ts 引入并 use</li>
        <li>创建路由配置 routes</li>
        <li>创建路由对象 const router = new VueRouter({ routes })</li>
        <li>new Vue({ router }) 注入</li>
        <li>创建页面组件</li>
        <li>配置导航和 <code>&lt;router-view/&gt;</code></li>
      </ol>
      <div class="code-block">
        <pre><code>// router/index.ts
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/layouts/AppHome.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '*', component: () => import('@/views/modules/404/NotFound.vue') }
]

const router = new VueRouter({ mode: 'history', routes })

export default router
</code></pre>
      </div>
    </section>

    <section>
      <h2>三、声明式导航 &amp; 高亮</h2>
      <div class="nav-demo">
        <router-link to="/home" exact>首页</router-link>
        <router-link to="/i18n-demo">i18n演示</router-link>
        <router-link to="/dark-mode-demo">暗黑模式</router-link>
        <router-link to="/scss-constant-demo">SCSS常量</router-link>
        <router-link to="/event-bus-demo">事件总线</router-link>
        <router-link to="/not-exist">404演示</router-link>
      </div>
      <p>
        当前路由：<b>{{ $route.path }}</b>
      </p>
      <p>高亮类名：<code>router-link-active</code>（模糊），<code>router-link-exact-active</code>（精确）</p>
      <div class="code-block">
        <pre><code>&lt;router-link to="/home"&gt;首页&lt;/router-link&gt;

// 可自定义高亮类名
const router = new VueRouter({
  routes,
  linkActiveClass: 'my-active',
  linkExactActiveClass: 'my-exact-active'
})
</code></pre>
      </div>
    </section>

    <section>
      <h2>四、路由参数传递</h2>
      <h3>1. 查询参数（query）</h3>
      <router-link :to="{ path: '/home', query: { msg: 'hello' } }">带query跳转</router-link>
      <p>
        获取：<code>$route.query.msg</code>，当前：<b>{{ $route.query.msg || '无' }}</b>
      </p>
      <h3>2. 动态路由（params）</h3>
      <router-link :to="{ name: 'User', params: { id: 123 } }">跳转用户123</router-link>
      <p>
        获取：<code>$route.params.id</code>，当前：<b>{{ $route.params.id || '无' }}</b>
      </p>
      <div class="code-block">
        <pre><code>// 路由配置
{ path: '/user/:id', name: 'User', component: UserComp }

// 跳转
this.$router.push({ name: 'User', params: { id: 123 } })

// 获取
this.$route.params.id
</code></pre>
      </div>
    </section>

    <section>
      <h2>五、编程式导航</h2>
      <button @click="goToI18n">push跳转i18n</button>
      <button @click="replaceToDark">replace跳转暗黑</button>
      <button @click="goBack">后退</button>
      <div class="code-block">
        <pre><code>// push
this.$router.push('/i18n-demo')

// replace
this.$router.replace('/dark-mode-demo')

// go
this.$router.go(-1)
</code></pre>
      </div>
    </section>

    <section>
      <h2>六、命名路由</h2>
      <div class="code-block">
        <pre><code>// 配置
{ path: '/user/:id', name: 'User', component: UserComp }

// 跳转
this.$router.push({ name: 'User', params: { id: 1 } })
</code></pre>
      </div>
    </section>

    <section>
      <h2>七、重定向</h2>
      <div class="code-block">
        <pre><code>{ path: '/', redirect: '/home' }</code></pre>
      </div>
    </section>

    <section>
      <h2>八、404配置</h2>
      <router-link to="/not-exist">点我体验404</router-link>
      <div class="code-block">
        <pre><code>{ path: '*', component: NotFound }</code></pre>
      </div>
    </section>

    <section>
      <h2>九、路由模式</h2>
      <div class="code-block">
        <pre><code>const router = new VueRouter({
  mode: 'history', // 或 'hash'
  routes
})
</code></pre>
      </div>
    </section>

    <section>
      <h2>十、其它常用API</h2>
      <ul>
        <li><code>this.$router.beforeEach(fn)</code>：全局前置守卫</li>
        <li><code>this.$router.afterEach(fn)</code>：全局后置钩子</li>
        <li><code>this.$route.fullPath</code>：完整路径</li>
        <li><code>this.$router.currentRoute</code>：当前路由对象</li>
      </ul>
    </section>

    <section>
      <h2>十一、路由嵌套与出口</h2>
      <div class="code-block">
        <pre><code>// 父路由
{
  path: '/parent',
  component: Parent,
  children: [
    { path: 'child', component: Child }
  ]
}

// 父组件模板
&lt;router-view/&gt;
</code></pre>
      </div>
    </section>

    <section>
      <h2>十二、完整路由配置示例（TS）</h2>
      <div class="code-block">
        <pre><code>import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/layouts/AppHome.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '*', component: () => import('@/views/modules/404/NotFound.vue') }
]

const router = new VueRouter({ mode: 'history', routes })

export default router
</code></pre>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'VueRouterPage',
  methods: {
    goToI18n() {
      ;(this as any).$router.push('/i18n-demo')
    },
    replaceToDark() {
      ;(this as any).$router.replace('/dark-mode-demo')
    },
    goBack() {
      ;(this as any).$router.go(-1)
    }
  }
})
</script>

<style lang="scss" scoped>
.vue-router-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  text-align: left;
  h1 {
    color: #3eaf7c;
    margin-bottom: 24px;
    text-align: left;
  }
  h2 {
    color: #2c3e50;
    margin: 0 0 12px 0;
    font-size: 22px;
    border-left: 4px solid #3eaf7c;
    padding-left: 10px;
    text-align: left;
  }
  section {
    margin-bottom: 30px;
    background: #f2f2f2;
    border-radius: 8px;
    padding: 18px 18px 8px 18px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    text-align: left;
  }
  .code-block {
    background: #222;
    color: #b5f4a5;
    border-radius: 6px;
    padding: 10px 14px;
    margin: 10px 0 0 0;
    font-size: 14px;
    overflow-x: auto;
    code {
      background: none;
      color: inherit;
      padding: 0;
    }
  }
  .nav-demo {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    a {
      padding: 6px 16px;
      border-radius: 4px;
      background: #f0f0f0;
      color: #333;
      text-decoration: none;
      .router-link-active {
        background: #3eaf7c;
        color: #fff;
      }
      .router-link-exact-active {
        border: 2px solid #3eaf7c;
      }
    }
  }
  button {
    margin-right: 10px;
    padding: 6px 18px;
    border-radius: 4px;
    border: none;
    background: #3eaf7c;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background: #2c3e50;
    }
  }
}
</style>
