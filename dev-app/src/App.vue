<template>
  <v-app>
    <Header
      @delete-local-storege="deleteLocalStorege"
    />
    <v-main>
      <v-container>
        <router-view
          :books="books"
          @add-book-list="addBook"
          @update-book-info="updateBookInfo"
        />
      </v-container>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
const STRAGE_KEY = 'books'

export default {
  name: 'App',

  components: {
    // HelloWorld,
    Header,
    Footer
  },

  data () {
    return {
      books: [],
      newBook: null
    }
  },
  mounted() {
    if (localStorage.getItem('STRAGE_KEY')) {
      try {
        this.books = JSON.parse(localStorage.getItem(STRAGE_KEY));
      } catch(e) {
        localStorage.removeItem(STRAGE_KEY);
      }
    }
  },
  methods: {
    addBook(e) {
      // 実際に何かしたことを入力する
      this.books.push({
        id: this.books.length,
        title: e.title,
        image: e.image,
        description: e.description,
        readDate: '',
        memo: ''
      });
      //this.newBook = '';
      this.saveBook();
      //最後に追加したidの取得コード
      //console.log(this.books.slice(-1)[0].id);
      this.goToEditPage(this.books.slice(-1)[0].id)
    },
    removeBook(x) {
      this.books.splice(x, 1);
      this.saveBook();
    },
    updateBookInfo (e){
      const updateInfo = {
        id: e.id,
        readDate: e.readDate,
        memo: e.memo,
        title: this.books[e.id].title,
        image: this.books[e.id].image,
        description: this.books[e.id].description
      }

      this.books.splice(e.id, 1, updateInfo);
      this.saveBook()
      this.$router.push('/');
    },
    saveBook() {
      const parsed = JSON.stringify(this.books);
      localStorage.setItem(STRAGE_KEY, parsed);
    },
    deleteLocalStorege() {
      const isDeleted = 'LocalStoregeのデータを削除しても良いですか？';
      if(window.confirm(isDeleted)) {
        localStorage.setItem(STRAGE_KEY, '');
        localStorage.removeItem(STRAGE_KEY);
        this.books = [];
        window.location.reload();
      }
    },
    goToEditPage(id){
      this.$router.push(`/edit/${id}`);
    },
  }
};
</script>
