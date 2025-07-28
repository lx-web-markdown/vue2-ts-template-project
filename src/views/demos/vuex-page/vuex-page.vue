<template>
  <div class="vuex-page">
    <h1>Vuex 全面知识梳理（Vue2 + TypeScript）</h1>

    <section>
      <h2>一、Vuex 概述</h2>
      <ul>
        <li>Vuex 是专为 Vue.js 应用程序开发的<strong>状态管理模式</strong>。</li>
        <li>集中式存储管理所有组件的状态，并以相应的规则保证状态以可预测的方式发生变化。</li>
        <li>适用于多个组件共享状态的场景，如用户信息、购物车等。</li>
      </ul>
    </section>

    <section>
      <h2>二、基本使用</h2>
      <ol>
        <li>安装：<code>npm i vuex@3</code></li>
        <li>创建 store：</li>
        <pre><code class="lang-ts">import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  }
})
</code></pre>
        <li>在 main.ts 挂载：</li>
        <pre><code class="lang-ts">import store from './store'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
</code></pre>
      </ol>
    </section>

    <section>
      <h2>三、在组件中使用 Vuex</h2>
      <pre><code class="lang-ts">import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount'])
  },
  methods: {
    ...mapMutations(['increment']),
    ...mapActions(['incrementAsync'])
  }
})
</code></pre>
      <div class="demo">
        <div>count: {{ $store.state.count }}</div>
        <div>doubleCount: {{ $store.getters.doubleCount }}</div>
        <button @click="increment">+1</button>
        <button @click="incrementAsync">异步+1</button>
      </div>
    </section>

    <section>
      <h2>四、模块化（modules）</h2>
      <p>当状态较多时，可以将 store 拆分为模块：</p>
      <pre><code class="lang-ts">// store/modules/user.ts
export default {
  namespaced: true,
  state: { name: '张三' },
  mutations: {
    setName(state, name: string) { state.name = name }
  },
  actions: {
    setNameAsync({ commit }, name: string) {
      setTimeout(() => commit('setName', name), 500)
    }
  },
  getters: {
    upperName(state) { return state.name.toUpperCase() }
  }
}

// store/index.ts
import user from './modules/user'
export default new Vuex.Store({
  modules: { user }
})
</code></pre>
      <br />
      <p>组件中使用：</p>
      <pre><code class="lang-ts">computed: {
  ...mapState('user', ['name']),
  ...mapGetters('user', ['upperName'])
},
methods: {
  ...mapMutations('user', ['setName']),
  ...mapActions('user', ['setNameAsync'])
}
</code></pre>
      <div class="demo">
        <div>用户名: {{ userName }}</div>
        <div>大写用户名: {{ $store.getters['user/upperName'] }}</div>
        <input v-model="inputName" placeholder="输入新用户名" />
        <button @click="setName(inputName)">同步修改用户名</button>
        <button @click="setNameAsync(inputName)">异步修改用户名</button>
      </div>
    </section>

    <section>
      <h2>五、常见问题与注意事项</h2>
      <ul>
        <li>不要在组件中直接修改 state，必须通过 mutations。</li>
        <li>mutations 必须是同步函数，异步操作请放在 actions。</li>
        <li>只有需要共享的状态才放到 Vuex。</li>
        <li>模块化时建议开启 <code>namespaced: true</code>。</li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// mapGetters
import { mapState, mapMutations, mapActions } from 'vuex'

export default Vue.extend({
  name: 'VuexPage',
  data() {
    return {
      inputName: ''
    }
  },
  computed: {
    ...mapState('user', {
      userName: (state: any) => state.name
    })
  },
  methods: {
    ...mapMutations(['increment']),
    ...mapActions(['incrementAsync']),
    ...mapMutations('user', ['setName']),
    ...mapActions('user', ['setNameAsync'])
  }
})
</script>

<style lang="scss" scoped>
.vuex-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #eee;

  h1 {
    text-align: left;
    margin-bottom: 32px;
    color: #2c3e50;
  }
  section {
    margin-bottom: 32px;
    background: #f9f9f9;
    border-radius: 6px;
    padding: 20px;
    box-shadow: 0 1px 3px #f0f0f0;
    text-align: left;
    h2 {
      color: #409eff;
      margin-bottom: 12px;
    }
    ul,
    ol {
      margin-left: 20px;
    }
    pre {
      background: #272822;
      color: #f8f8f2;
      padding: 12px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 14px;
    }
    .demo {
      margin-top: 16px;
      button {
        margin-right: 10px;
        padding: 6px 16px;
        background: #409eff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
          background: #66b1ff;
        }
      }
      div {
        margin-bottom: 8px;
      }
      input {
        padding: 4px 8px;
        margin-right: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    }
  }
}
</style>
