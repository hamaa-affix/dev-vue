<template>
  <div>
    <h1>ほんの一覧</h1>
    <ul>
      <li
        @click="showBookDetail(book.id)"
        v-for="book in books"
        :key="book.id"
      >
        {{ book.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BookList',
  data() {
    return {
      bookIndex: -1,
      books: [
        {id:1, title:'ほんのタイトル', content: '本の内容'},
        {id:2, title:'ほんのタイトル2', content: '本の内容2'},
        {id:3, title:'ほんのタイトル3', content: '本の内容3'},
      ]
    }
  },
  methods: {
    showBookDetail(id) {
      //配列の場合は頭が0スタートなので
      this.bookIndex = id - 1;
      console.log(this.bookIndex);
      this.$router.push({  //クリックしたタイミングでparamsを渡す。
        //nemeはrouter(index.js)で設定した名前
        name: 'BookDetail',
        params: {
          //idの設定、booksの配列の何番目のidを取得するか
          id: this.books[this.bookIndex].id,
          title: this.books[this.bookIndex].title,
          content: this.books[this.bookIndex].content
        }
      })
    }
  },
}
</script>
