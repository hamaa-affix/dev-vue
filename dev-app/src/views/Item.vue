<template>
  <div>
    Item
    <router-link to="1">Item</router-link>
    <router-link to="2">Item2</router-link>
    {{ $route.params.id }}
  </div>
</template>

<script>
//Itmeというコンポーネントで同じコンポーネントへrouter-linkを使用した場合はcreatedなどのライフサイクルは1度しか行われない。
//差分を検知できない。解決策としてはwatchで差分を検知して対応する
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
</script>
