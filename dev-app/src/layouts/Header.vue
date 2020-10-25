<template>
  <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer></v-spacer>
      <v-btn
      color="error"
      @click="deleteLocalStorage">
      削除する
      </v-btn>
    </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>
