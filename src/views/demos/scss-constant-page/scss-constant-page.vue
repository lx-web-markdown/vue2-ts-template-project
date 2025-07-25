<template>
  <div class="css-constant-page">
    <h1>SCSS 常量介绍与使用</h1>
    <section class="desc">
      <p>
        SCSS 支持使用 <b>变量/常量</b> 来统一管理样式值，便于维护和复用。常量通常定义在单独的
        <code>.scss</code> 文件中，例如 <code>src/assets/css/constant/color.scss</code>。
      </p>
      <p>下面以 <code>color.scss</code> 文件为例，展示常量的定义和使用方法。</p>
    </section>

    <h2>常量定义示例：</h2>
    <section class="code-block">
      <pre><code class="language-scss">
// src/assets/css/constant/color.scss
$lx-color-text-primary: #34495e;
$lx-color-bg-main: #fff;
$lx-color-brand-purple: #5758bb;
// ... 其他常量
      </code></pre>
    </section>

    <h2>如何在SCSS中使用常量？</h2>
    <section class="import-tip">
      <ol>
        <li>在需要的 <code>scss</code> 文件顶部导入常量文件：</li>
        <pre><code class="language-scss">
@import '@/assets/css/constant/color.scss';
        </code></pre>
        <br />
        <li>直接在样式中使用 <code>$常量名</code>：</li>
        <pre><code class="language-scss">
.demo-box {
  color: $lx-color-text-primary;
  background: $lx-color-bg-main;
}
        </code></pre>
      </ol>
    </section>

    <h2>常量使用演示：</h2>
    <section class="usage-demo">
      <div class="demo-box primary-text">主文本颜色（$lx-color-text-primary）</div>
      <div class="demo-box bg-main">主背景色（$lx-color-bg-main）</div>
      <div class="demo-box brand-purple">品牌紫色（$lx-color-brand-purple）</div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CssConstantPage'
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/constant/color.scss';

.css-constant-page {
  padding: 32px;
  font-family: Arial, Helvetica, sans-serif;
  background: $lx-color-bg-main;
  color: $lx-color-text-primary;
  min-height: 100vh;
  width: 900px;
  margin: 0 auto;

  h1 {
    margin-bottom: 16px;
    color: $lx-color-brand-purple;
  }

  h2 {
    text-align: left;
    margin-bottom: 20px;
  }

  .desc,
  .import-tip {
    text-align: left;
    margin-bottom: 24px;
    background: $lx-color-code-bg;
    padding: 16px;
    padding-left: 30px;
    border-radius: 8px;
    border-left: 4px solid $lx-color-brand-purple;
  }
  .code-block {
    text-align: left;
    margin-bottom: 24px;
    pre {
      background: $lx-color-code-bg;
      color: $lx-color-code-text;
      padding: 12px;
      padding-left: 30px;
      border-radius: 6px;
      font-size: 15px;
      overflow-x: auto;
    }
  }
  .usage-demo {
    text-align: left;
    margin-bottom: 24px;
    .demo-box {
      padding: 12px 20px;
      margin-bottom: 12px;
      border-radius: 6px;
      font-size: 16px;
      border: 1px solid $lx-color-border-default;
      &.primary-text {
        color: $lx-color-text-primary;
        background: #f8fafc;
      }
      &.bg-main {
        background: $lx-color-bg-main;
        color: $lx-color-brand-fuchsia;
      }
      &.brand-purple {
        background: $lx-color-brand-purple;
        color: #fff;
      }
    }
  }
}
</style>
