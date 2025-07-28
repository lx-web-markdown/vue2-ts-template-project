<template>
  <div class="event-bus-demo">
    <h2>Event Bus 示例（Vue2 + TypeScript）</h2>
    <p class="desc">Event Bus（事件总线）是一种跨组件通信方案，适用于没有直接父子关系的组件间传递消息。</p>
    <div class="sender">
      <h3>发送事件</h3>
      <input v-model="inputMsg" placeholder="输入要发送的消息" />
      <button @click="sendEvent">发送消息</button>
    </div>
    <div class="receiver">
      <h3>接收事件</h3>
      <p v-if="receivedMsg">
        收到消息：<span class="msg">{{ receivedMsg }}</span>
      </p>
      <p v-else>暂无消息</p>
    </div>
    <div class="tips">
      <h3>核心代码说明：</h3>
      <ul>
        <li>event-bus.ts：<code>export default new Vue()</code> 导出事件总线对象</li>
        <li>发送事件：<code>eventBus.$emit('eventName', data)</code></li>
        <li>接收事件：<code>eventBus.$on('eventName', callback)</code></li>
        <li>组件销毁时记得 <code>eventBus.$off('eventName', callback)</code> 解绑</li>
      </ul>
    </div>

    <div class="tips" style="margin-top: 30px">
      <h3>原理说明</h3>
      <ul>
        <li>vm.$on()：监听当前实例上的自定义事件。</li>
        <li>vm.$emit()：触发当前实例上的事件。附加参数都会传给监听器回调。</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import eventBus from '@/utils/event-bus'

export default Vue.extend({
  name: 'EventBusPage',
  data() {
    return {
      inputMsg: '',
      receivedMsg: ''
    }
  },
  methods: {
    // 发送事件
    sendEvent() {
      if (this.inputMsg.trim()) {
        eventBus.$emit('custom-event', this.inputMsg)
        this.inputMsg = ''
      }
    },
    // 事件回调
    onCustomEvent(msg: string) {
      this.receivedMsg = msg
    }
  },
  mounted() {
    eventBus.$on('custom-event', this.onCustomEvent)
  },
  beforeDestroy() {
    eventBus.$off('custom-event', this.onCustomEvent)
  }
})
</script>

<style lang="scss" scoped>
.event-bus-demo {
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  .desc {
    text-align: left;
    color: #666;
    margin-bottom: 20px;
  }
  .sender,
  .receiver {
    margin-bottom: 24px;
    text-align: left;
    h3 {
      margin-bottom: 8px;
      color: #333;
    }
    input {
      padding: 6px 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-right: 8px;
    }
    button {
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
    .msg {
      color: #409eff;
      font-weight: bold;
    }
  }
  .tips {
    background: #fffbe6;
    border: 1px solid #ffe58f;
    border-radius: 4px;
    padding: 12px 16px;
    font-size: 14px;
    color: #ad8b00;
    text-align: left;
    ul {
      margin: 0;
      padding-left: 20px;
    }
    code {
      text-align: left;
      background: #f4f4f4;
      padding: 2px 4px;
      border-radius: 2px;
      font-size: 13px;
    }
  }
}
</style>
