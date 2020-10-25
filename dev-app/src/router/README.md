## VueRouter
 - webページのroutingをしてくれるプラグイン
 - src直下にjs拡張子ファイルを作成、routerディレクトリを作成しおいて管理しても良い。
### 記述方法
 - jsファイルにVue、vue-routerのimportを行い、vue-routerはVue.useする。
 - routingを定義して、export defaultをして、main.jsに登録していく
 ```

import Vue from 'vue';
//vue-routerプラグインのimport
import Router from 'vue-router';
//実際にroutingするファイルをimportする
import Home from '../views/Home.vue';

//vue-routerを使える様にしている。
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
  ]
})
 ```
または
```
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
```

 - main.jsに登録していく
 ```
  import Vue from 'vue'
  import App from './App.vue'
  import router from './router/index.js'

  Vue.config.productionTip = false

  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
 ```

###登録したcomponentの使用方法
- App.vueに<router-view>として登録、使用できる様にする。
```
<template>
  <v-app>
    <Header/>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer/>
  </v-app>
</template>
```
## router-link
- router-linkコンポーネントを使用して画面遷移を行う
- to属性をしよして,routingや動的routingを行う。
```
<!-- 文字列 -->
<router-link to="home">Home</router-link>
<router-link to="/">Home</router-link>

<!-- 次のように描画される -->
<a href="home">Home</a>

<!-- 他のプロパティのバインディングのような `v-bind` の省略表現 -->
<router-link :to="'home'">Home</router-link>

<!-- 上記と同じ -->
<router-link :to="{ path: 'home' }">Home</router-link>

<!-- 名前付きルート -->
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
<!-- 結果的に `/register?plan=private` になるクエリ-->
<router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>

```
## 動的パラメータ
- routeパスに :idを付与してやることで動的に表現できる。
- paramsを付与するには
  - propsにてviewで$router.pushでパラムスを指定
  - pushされたパラムスをrouter/index.jsで受け取る
  - 受け取り先の子viewでpropsを定義して受け取る。
```
View
methods: {
    showBookDetail(id) {
      //中略
      //クリックしたタイミングでparamsを渡す
      this.$router.push({
        //nemeはrouter/index.jsで設定した名前
        name: 'BookDetail',
        params: {
          //idの設定、booksの配列の何番目のidを取得するか
          //大まかにここで指定したparamsをrouterに渡している。
          id: this.books[this.bookIndex].id,
          title: this.books[this.bookIndex].title,
          content: this.books[this.bookIndex].content
        }
      })
    }
  },


//router/index.js
{
   name: 'BookDetail',
   //:idとすることで動的に表現ができるが、paramsの指定がない。
    path: '/book/:id',
    component: BookDetail
    props: (route) => ({
      //親viewから渡された値を取得
      //ここで取得したidが上記の:ipにバインドされている模様
      id: route.params.id,
      title: route.params.title,
      content: route.params.content
    })
}

//遷移したいView
<template>
  <div>
    <h1>本の詳細</h1>
    <p>タイトル</p>{{ title }}
    <br>
    {{ content }}
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    title: String,
    content: String
  }
}

流れとしては親->router->子　全てprops経由で渡している。
```

## $router, $route
- $router = VueRouterインスタン（全体）
- $route = ルートオブジェクト（現在のページ）、routeObjectのparamsにアクセスする際はthis.$route.paramsでアクセス。


## watch
- 同じcomponent内でcomponent(同一)の使い回しやrouter-linkを付与し動的に変化をつけた場合、再描画はない(ライフサイクルは1回)のみ
- 上記だと差分の検知ができないのでこれに対処するのがwatchである
```
watch {
  ex_funa (newvalue, oldvalue) {

  }
}

//実際のコード
//createdは仮想domが作られたタイミングでないと表示されない。
//watchであればroute.paramsが変化したタイミングで処理を行ってくれる。
export default {
  created() {
    console.log('Itme');
  },
  watch: {
    $route(to, from){
      console.log(to);
      console.log(from);
    }
  },
}
```

## ネストされたルート
 - routingはネストできる。
 - ネストするにはchildrenの要素を用いて表現する。
```
router/index.js

//childrenは配列で表現し、オブジェクトで管理する。
{
path: '/user',
component: User,
children: [
  {
    path: 'profile',
    component: UserProfile,
  },
  {
    path: 'post',
    component: UserPost,
  }
]
}

//実施のview
<template>
  <div>user情報<br>
    <!--router-viewはフルパスで記述-->
    <router-link to="/user/profile">プロフィール</router-link> |
    <router-link to="/user/post">Post</router-link> |
    <router-view/><!--User.vueが読み込まれている-->
  </div>
</template>
```

## 名前付きrouterView
- 同一がroute内でrouterViewを複数使用することが可能。
- その際には名前の付与が必要になってくる。
```
router/index.js

//'/'内ででcomponentsで登録(普段はcomponent
//nameを付与しcomponentを登録していく。ちなみに設定はしなくともdefaultのnameが付与されている。
 path: '/',
    name: 'Home',
    components: {
      default: Home,
      sub: HomeSub
```
## ナビゲーションガード
