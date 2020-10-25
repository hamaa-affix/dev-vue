<template>
  <div>
    <h1>本の詳細</h1>
    <p>タイトル</p>{{ title }}
    <br>
    <p>{{ content }}</p>
    {{ books[bookIndex].title }}
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    title: String,
    content: String
  },
  data() {
    return {
      bookIndex: this.$route.params.id -1,
      books: [
        {id:1, title:'ほんのタイトル', content: '本の内容'},
        {id:2, title:'ほんのタイトル2', content: '本の内容2'},
        {id:3, title:'ほんのタイトル3', content: '本の内容3'},
      ]
    }
  },
  created() {
    //book idが登録がの番号をURLで叩かれた時のリダイレクト処理。
    if(this.$route.params.id > this.books.length) {
      this.$router.push('/book');
    }
  },
}
</script>
