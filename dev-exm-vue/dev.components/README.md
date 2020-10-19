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
- props
  - 親のデータを子に渡す
  - 子conponentに受け取る属性名を指定する。
  - 親はで登録しているデータをtemplateを渡す。
  - propsが親とのlinkという考えを持ってやれば良い。props属性を通じて、親のデータをv-bindで渡す。
```

  <div id="app" class="pearent">
    <!--props属性にv-bindしデータバインディング-->
    <my-component :title="titleName" class="child"></my-component>
    <my-component desabled class="child"></my-component>
  </div>

<script>
    let myComponent = {
    template: `<div>
                  <p>local componentです</p>
                  <div v-show="isShow">表示</div>
                  <p>{{ getTitle }}</p><!--propsで受け取った値をばデータバインディング-->
              </div>`,
    //props属性を指定している。ここで型宣言もできるし、default値を定義することもできる。
    props: {
      title: {
        type: String,
      },
      desabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        //受けっとた値を保持させる
        getTitle: this.title
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
        titleName:"this is title name"
      }
    }
  });
  </script>
```
- $emitで子から親へデータを渡す。
  - 子componentで$emitでカスタムイベントを作成
  - 親カスタムイベント受け取ることができる。
  - 両者ともmethodで定義が必要。eventをメソッドで作成するイメージ
```
<div id="app" class="pearent">
    <!--子componentに@カスタムイベント名="親のmetod名"-->
    <my-component @custm-event="pearentMethod"
                  class='child'
    >
  </my-component>
  </div>


  <script>
    let myComponent = {
    template: `<div>
                  <button @click="childMethod">子側のボタン</button>
              </div>`,
    methods: {
      childMethod () {
        //$emitの第一引数はカスタムイベント名(ケバブ), 第２引数は渡す値
        this.$emit("custm-event", "子の値")
      }
    }
  }

  const app = new Vue({
    el: "#app",
    components: {
      myComponent
    },
    data() {
      return {
      }
    },
    methods: {
      //子からイベントを受け取ったらmethodが実行される。
      pearentMethod(event) {
        console.log(event);
      }
    }
  });
  </script>
```
- Event bus
  - 
