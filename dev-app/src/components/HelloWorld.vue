<template>
  <v-container>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>タイトル</th>
          <th>著者名</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, key) in books" :key='key'>
          <th>{{ book.id }}</th>
          <th>{{ book.title }}</th>
          <th>{{ book.authoer }}</th>
          <th>{{ book.url }}</th>
        </tr>
      </tbody>
    </table>
  </v-container>
</template>

<script>

  export default {
    name: 'HelloWorld',

    data: () => ({
        books: [
          {
            id:1,
            title: 'bookname',
            authoer:  '著者名',
            url: 'https://google.com'
          },
          {
            id:2,
            title: 'bookname',
            authoer:  '著者名2',
            url: 'https://twitter.com'
          },
        ]
    }),
    methods: {
      remove () {
        this.book.shift();
      }
    }
  }
</script>
