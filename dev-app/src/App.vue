<template>
  <v-app>
    <Header/>
    <v-main>
      <v-container>
        <router-view
          :books="books"
          @add-book-list="addBook"
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
    saveBook() {
      const parsed = JSON.stringify(this.books);
      localStorage.setItem(STRAGE_KEY, parsed);
    },
    goToEditPage(id){
      this.$router.push(`/edit/${id}`);
    }
  }
};
</script>
