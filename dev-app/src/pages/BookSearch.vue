<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-text-field
          label="本のタイトル検索"
          v-model="keyWord"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-btn color="primary" @click="search(keyWord)">本を検索する</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn color="secondary" to="/">一覧に戻る</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12" md="6"
        v-for="(searchResult, index) in searchResults"
        :key="index"
      >
        <v-card class="mx-auto">
          <v-row>
            <v-col cols="4">
              <v-img :src="searchResult.image"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-title>{{ searchResult.title }}</v-card-title>
              {{ searchResult.description }}
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  color="indigo"
                  @click="addBookList(index)"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
</div>
</template>

<script>
export default {
  name: 'BookSearch',
  data() {
    return {
      keyWord: '',
      searchResults: []
    }
  },
  methods: {
    //fetchでjson取得
    async search(keyWord) {
      //クエリストリングを作成
      this.serchResults = []
      const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'
      const params = {
        q: `intitle:${keyWord}`,
        maxResults: 40
      }
      const queryParams = new URLSearchParams(params)
      console.log(baseUrl + queryParams)
      //fetchでjson取得
      const response = await fetch(baseUrl + queryParams)
      .then( response => response.json())
      console.log(response)
      // 必要な情報を配列にpush
      //取得したbook情報を各プロパティを設定しvalue値を代入していく
      for(let book of response.items) {
        // forで回しながら、値を設定
        let title = book.volumeInfo.title
        let img = book.volumeInfo.imageLinks
        let description = book.volumeInfo.description
        // searchResultsの配列がからならpushして追加していく
        this.searchResults.push({
          title: title ? title : '',

          image: img ? img.thumbnail : '',
          description: description ?  description.slice(0, 40) : ''
        })
      }
    },
    addBookList(index) {
      this.$emit('add-book-list', this.searchResults[index]);
    }
  }
}
</script>

<style>

</style>
