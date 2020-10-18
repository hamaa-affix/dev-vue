## component
- grolbal components
  - Vueインスタン生成前に宣言しておく
```

<div id="app>
  <コンポーネント名/>
  <コンポーネント名/> <!--使い回し可能-->
</div>

<script>
// グローバルコンポーネント
//templateの中身はdivタグで囲む。
Vue.component('コンポーネント名', {
  template: `<div>
                <p>grobal componentです</p>
                <div v-show="isShow">表示</div>
            <div>`,
  data() {
    return() {
      isShow: false,
    }
  }
})
const app = new Vue({
    el: "#app",
});
</script>
```

- local compoent
  - 変数で定義しインスタン内のcompornentの登録を行う。
  - 基本的にはlocal componentを使用する
```
<div id="app">
    <my-component></my-component>
</div>

<script>
//local component
let myComponent = {
  template: `<div>
                <p>local componentです</p>
                <div v-show="isShow">表示</div>
            <div>`,
  data() {
    return {
      isShow: false
    }
  }
}
const app = new Vue({
    el: "#app",
    components: {
      //"my-component": myComponent,
      myComponent
    },
    data() {
      return {

      }
    }
});
</script>
```
